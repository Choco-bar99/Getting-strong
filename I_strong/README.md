# 自律清單網站

這是一個簡單的自律清單網站，可以部署到Render。

## 功能
- 新增每日任務
- 為一周的每一天勾選完成狀態
- 顯示完成進度（以一周總任務為100%）

## 風格
科技風，黑底設計。

## 本地測試
運行 `python -m http.server 8000`，然後訪問 http://localhost:8000

## 部署到Render
1. 創建GitHub repository
2. 推送這些文件到repo
3. 在Render.com創建新靜態網站
4. 連接GitHub repo
5. 部署

數據保存在瀏覽器localStorage中。