/**
 * 管理员初始化脚本
 * 运行此脚本创建第一个超级管理员账号
 *
 * 使用方法:
 * node scripts/init-admin.js
 *
 * 会提示输入用户名和密码
 */

const User = require("../models/user");
const sequelize = require("../config/database");

async function initAdmin() {
  try {
    await sequelize.authenticate();
    console.log("✅ 数据库连接成功");

    await User.sync();
    console.log("✅ 用户模型同步完成");

    const count = await User.count();
    if (count > 0) {
      console.log(`⚠️  已有 ${count} 个用户记录`);
      console.log("💡 如需创建新超级管理员，请使用管理员后台或 API");
      process.exit(0);
    }

    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("请输入管理员用户名 (至少3个字符): ", (username) => {
      rl.question("请输入管理员密码: ", (password) => {
        rl.question("请确认密码: ", (confirmPassword) => {
          rl.close();

          if (username.length < 3) {
            console.log("❌ 用户名至少需要3个字符");
            process.exit(1);
          }

          if (password.length < 6) {
            console.log("❌ 密码至少需要6个字符");
            process.exit(1);
          }

          if (password !== confirmPassword) {
            console.log("❌ 两次输入的密码不一致");
            process.exit(1);
          }

          User.create({
            username,
            password,
            role: "super_admin",
            isActive: true,
            installedApps: [],
          })
            .then((user) => {
              console.log("✅ 超级管理员创建成功！");
              console.log(`   用户名: ${user.username}`);
              console.log(`   角色: ${user.role}`);
              console.log("\n💡 请妥善保存账号密码信息");
              process.exit(0);
            })
            .catch((err) => {
              console.error("❌ 创建管理员失败:", err.message);
              process.exit(1);
            });
        });
      });
    });
  } catch (error) {
    console.error("❌ 初始化失败:", error);
    process.exit(1);
  }
}

initAdmin();
