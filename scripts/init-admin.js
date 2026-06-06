/**
 * 管理员初始化脚本
 * 运行此脚本创建第一个超级管理员账号
 *
 * 使用方法:
 * node scripts/init-admin.js
 *
 * 会提示输入用户名和密码
 */

const Admin = require("../models/admin");
const sequelize = require("../config/database");

async function initAdmin() {
  try {
    // 连接数据库
    await sequelize.authenticate();
    console.log("✅ 数据库连接成功");

    // 同步模型
    await Admin.sync();
    console.log("✅ 管理员模型同步完成");

    // 检查是否已有管理员
    const count = await Admin.count();
    if (count > 0) {
      console.log(`⚠️  已有 ${count} 个管理员账号，是否需要覆盖？(y/n)`);
      // 这里简单处理，直接退出
      console.log("💡 如需创建新管理员，请先删除现有管理员记录");
      process.exit(0);
    }

    // 提示输入信息
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("请输入管理员用户名 (至少3个字符): ", (username) => {
      rl.question("请输入管理员密码: ", (password) => {
        rl.question("请确认密码: ", (confirmPassword) => {
          rl.close();

          // 验证
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

          // 创建管理员
          Admin.create({
            username,
            password, // 模型会自动加密
            role: "super_admin",
            isActive: true,
          })
            .then((admin) => {
              console.log("✅ 超级管理员创建成功！");
              console.log(`   用户名: ${admin.username}`);
              console.log(`   角色: ${admin.role}`);
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
