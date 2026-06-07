const express = require("express");
const MarketApp = require("../models/marketApp");
const User = require("../models/user");
const { authMiddleware, superAdminOnly } = require("../middleware/superAdmin");

const router = express.Router();

MarketApp.belongsTo(User, { foreignKey: "uploadedBy", as: "uploader" });

// 获取分类列表
router.get("/categories", async (req, res) => {
  try {
    const categories = await MarketApp.findAll({
      attributes: [
        [require("sequelize").fn("DISTINCT", require("sequelize").col("category")), "category"],
      ],
      where: { category: { [require("sequelize").Op.ne]: null } },
      raw: true,
    });
    const counts = {};
    for (const { category } of categories) {
      if (category) {
        counts[category] = await MarketApp.count({ where: { category } });
      }
    }
    res.json({
      success: true,
      data: Object.entries(counts).map(([name, count]) => ({ name, count })),
    });
  } catch (error) {
    console.error("获取分类错误:", error);
    res.status(500).json({ error: "服务器内部错误" });
  }
});

// 获取应用列表
router.get("/apps", async (req, res) => {
  try {
    const { category, keyword, page = "1", limit = "20" } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;

    const where = {};
    if (category) {
      where.category = category;
    }
    if (keyword) {
      where[require("sequelize").Op.or] = [
        { name: { [require("sequelize").Op.like]: `%${keyword}%` } },
        { description: { [require("sequelize").Op.like]: `%${keyword}%` } },
      ];
    }

    const { rows, count } = await MarketApp.findAndCountAll({
      where,
      attributes: [
        "id",
        "name",
        "icon",
        "description",
        "version",
        "author",
        "category",
        "size",
        "isOfficial",
        "downloads",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]],
      offset,
      limit: limitNum,
    });

    res.json({
      success: true,
      data: {
        items: rows,
        total: count,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(count / limitNum),
      },
    });
  } catch (error) {
    console.error("获取应用列表错误:", error);
    res.status(500).json({ error: "服务器内部错误" });
  }
});

// 获取应用详情
router.get("/apps/:id", async (req, res) => {
  try {
    const app = await MarketApp.findByPk(req.params.id, {
      attributes: [
        "id",
        "name",
        "icon",
        "description",
        "version",
        "author",
        "category",
        "size",
        "screenshots",
        "readme",
        "isOfficial",
        "downloads",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!app) {
      return res.status(404).json({ error: "应用不存在" });
    }

    const data = app.toJSON();
    if (data.screenshots) {
      try {
        data.screenshots = JSON.parse(data.screenshots);
      } catch {
        data.screenshots = [];
      }
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error("获取应用详情错误:", error);
    res.status(500).json({ error: "服务器内部错误" });
  }
});

// 下载应用 JS 包
router.get("/apps/:id/download", async (req, res) => {
  try {
    const app = await MarketApp.findByPk(req.params.id, {
      attributes: ["fileContent", "name", "version"],
    });

    if (!app) {
      return res.status(404).json({ error: "应用不存在" });
    }

    // 增加下载计数（异步，不阻塞）
    MarketApp.increment("downloads", { by: 1, where: { id: req.params.id } }).catch(() => {});

    // 返回 JSON，前端拿到后存 IndexedDB
    res.json({
      success: true,
      data: {
        name: app.name,
        version: app.version,
        fileContent: app.fileContent,
      },
    });
  } catch (error) {
    console.error("下载应用错误:", error);
    res.status(500).json({ error: "服务器内部错误" });
  }
});

// 上传应用
router.post("/apps", authMiddleware, superAdminOnly, async (req, res) => {
  try {
    const { name, icon, description, version, category, fileContent, screenshots, readme } =
      req.body;

    if (!name || !icon || !fileContent) {
      return res.status(400).json({ error: "名称、图标和文件内容不能为空" });
    }

    const app = await MarketApp.create({
      name,
      icon,
      description: description || "",
      version: version || "1.0.0",
      author: req.user.username,
      category: category || "",
      fileContent,
      size: new Blob([fileContent]).size,
      screenshots: screenshots ? JSON.stringify(screenshots) : null,
      readme: readme || "",
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "上传成功",
      data: { id: app.id, name: app.name, version: app.version },
    });
  } catch (error) {
    console.error("上传应用错误:", error);
    res.status(500).json({ error: "服务器内部错误" });
  }
});

// 更新应用
router.put("/apps/:id", authMiddleware, superAdminOnly, async (req, res) => {
  try {
    const app = await MarketApp.findByPk(req.params.id);

    if (!app) {
      return res.status(404).json({ error: "应用不存在" });
    }

    const { name, icon, description, version, category, fileContent, screenshots, readme } =
      req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (icon !== undefined) updateData.icon = icon;
    if (description !== undefined) updateData.description = description;
    if (version !== undefined) updateData.version = version;
    if (category !== undefined) updateData.category = category;
    if (screenshots !== undefined) updateData.screenshots = JSON.stringify(screenshots);
    if (readme !== undefined) updateData.readme = readme;

    if (fileContent !== undefined) {
      updateData.fileContent = fileContent;
      updateData.size = new Blob([fileContent]).size;
    }

    await app.update(updateData);

    res.json({
      success: true,
      message: "更新成功",
    });
  } catch (error) {
    console.error("更新应用错误:", error);
    res.status(500).json({ error: "服务器内部错误" });
  }
});

// 删除应用
router.delete("/apps/:id", authMiddleware, superAdminOnly, async (req, res) => {
  try {
    const app = await MarketApp.findByPk(req.params.id);

    if (!app) {
      return res.status(404).json({ error: "应用不存在" });
    }

    await app.destroy();

    res.json({
      success: true,
      message: "删除成功",
    });
  } catch (error) {
    console.error("删除应用错误:", error);
    res.status(500).json({ error: "服务器内部错误" });
  }
});

module.exports = router;
