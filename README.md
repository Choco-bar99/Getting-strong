ㄘ# 自律清單網站

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
1. 創建GitHub repository並推送這些文件
2. 在Render.com註冊並創建新靜態網站
3. 連接GitHub repo
4. 設置build command為空（靜態網站）
5. 部署

數據保存在瀏覽器localStorage中。
5. 部署

數據保存在瀏覽器localStorage中。