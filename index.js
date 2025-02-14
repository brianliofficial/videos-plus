const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 初始化 Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// **[1] 取得所有影片**
app.get("/api/videos", async (req, res) => {
  const { data, error } = await supabase.from("videos").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// **[2] 新增影片**
app.post("/api/videos", async (req, res) => {
  const { data, error } = await supabase.from("videos").insert(req.body);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// **[3] 刪除影片**
app.delete("/api/videos/:id", async (req, res) => {
  const { data, error } = await supabase.from("videos").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// **[4] 修改影片**
app.put("/api/videos/:id", async (req, res) => {
  const { data, error } = await supabase.from("videos").update(req.body).eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});