# CRUD User API Documentation

Tài liệu này cung cấp thông tin về tất cả các API routes, payload, và response của dịch vụ Quản lý Người dùng (CRUD User API) để Frontend có thể dễ dàng tích hợp.

---

## 1. Lấy danh sách tất cả người dùng
- **Route:** `GET /api/users`
- **Mô tả:** Trả về danh sách tất cả người dùng trong cơ sở dữ liệu.
- **Payload (Request Body):** *Không có*
- **Response (200 OK):**
```json
[
  {
    "_id": "66b437c9ce982033cd76a63",
    "name": "User1",
    "email": "user1@example.com",
    "age": 18,
    "createdAt": "2026-08-02T10:00:00.000Z",
    "updatedAt": "2026-08-02T10:00:00.000Z"
  }
]
```

---

## 2. Thêm người dùng mới
- **Route:** `POST /api/users`
- **Mô tả:** Tạo một bản ghi người dùng mới trong cơ sở dữ liệu. `name` và `email` (duy nhất) là bắt buộc.
- **Payload (Request Body):**
```json
{
  "name": "User1",
  "email": "user1@example.com",
  "age": 18
}
```
- **Response (201 Created):**
```json
{
  "message": "Thành công",
  "data": {
    "_id": "66b437c9ce982033cd76a63",
    "name": "User1",
    "email": "user1@example.com",
    "age": 18,
    "createdAt": "2026-08-02T10:00:00.000Z",
    "updatedAt": "2026-08-02T10:00:00.000Z"
  }
}
```
- **Lỗi (500 Internal Server Error):** Trùng lặp email hoặc dữ liệu không hợp lệ.
```json
{
  "error": "E11000 duplicate key error collection: test.users index: email_1 dup key: { email: \"user1@example.com\" }"
}
```

---

## 3. Lấy thông tin chi tiết người dùng theo ID
- **Route:** `GET /api/users/{id}`
- **Mô tả:** Tìm kiếm và trả về thông tin của 1 người dùng theo mã `id`.
- **Tham số (Path Parameter):** `id` (Mã MongoDB ObjectId của người dùng).
- **Payload (Request Body):** *Không có*
- **Response (200 OK):**
```json
{
  "_id": "66b437c9ce982033cd76a63",
  "name": "User1",
  "email": "user1@example.com",
  "age": 18,
  "createdAt": "2026-08-02T10:00:00.000Z",
  "updatedAt": "2026-08-02T10:00:00.000Z"
}
```
- **Lỗi (404 Not Found):**
```json
{
  "message": "Không tìm thấy"
}
```

---

## 4. Cập nhật thông tin người dùng theo ID
- **Route:** `PUT /api/users/{id}`
- **Mô tả:** Cập nhật thông tin người dùng theo mã `id` và trả về thông tin mới sau khi sửa.
- **Tham số (Path Parameter):** `id` (Mã ID của người dùng cần cập nhật).
- **Payload (Request Body):** Gửi thông tin cần cập nhật (có thể gửi các trường mong muốn).
```json
{
  "name": "User1_Updated",
  "email": "user1_new@example.com",
  "age": 19
}
```
- **Response (200 OK):**
```json
{
  "_id": "66b437c9ce982033cd76a63",
  "name": "User1_Updated",
  "email": "user1_new@example.com",
  "age": 19,
  "createdAt": "2026-08-02T10:00:00.000Z",
  "updatedAt": "2026-08-02T10:10:00.000Z"
}
```

---

## 5. Xóa người dùng theo ID
- **Route:** `DELETE /api/users/{id}`
- **Mô tả:** Xóa người dùng tương ứng với `id` khỏi hệ thống.
- **Tham số (Path Parameter):** `id` (Mã ID của người dùng cần xóa).
- **Payload (Request Body):** *Không có*
- **Response (200 OK):**
```json
{
  "message": "Đã xóa"
}
```
