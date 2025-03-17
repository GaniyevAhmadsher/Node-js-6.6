# TypeORM CRUD loyihasi

Bu loyiha o'quvchilar uchun TypeORM yordamida CRUD (Create, Read, Update, Delete) amallarini bajarishni o'rgatish uchun mo'ljallangan. Loyiha TypeScript tilida yozilgan va Express.js frameworkidan foydalanadi.

## Loyiha maqsadi

O'quvchilar ushbu loyiha orqali:

- TypeORM bilan ishlashni
- PostgreSQL ma'lumotlar bazasiga ulanishni
- Entity va Relation tushunchalarini
- CRUD amallarini bajarishni o'rganadilar

## Ma'lumotlar bazasi modellashtirish sxemasi

Loyihada ikkita asosiy entity mavjud:

1. `User` (Foydalanuvchi)
2. `Post` (Maqola)

Foydalanuvchi va maqola o'rtasida "One-to-Many" (Bir nechta) munosabat mavjud: bir foydalanuvchiga bir nechta maqola tegishli.

## Texnologiyalar

- Node.js
- TypeScript
- Express.js
- TypeORM
- PostgreSQL

## Loyiha tuzilishi

```
/
├── src/
│   ├── controller/
│   │   ├── UserController.ts
│   │   └── PostController.ts
│   ├── entity/
│   │   ├── User.ts
│   │   └── Post.ts
│   ├── routes/
│   │   ├── userRoutes.ts
│   │   └── postRoutes.ts
│   ├── config/
│   │   └── database.ts
│   ├── app.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── .env
```

## O'rnatish bo'yicha ko'rsatmalar

1. Loyihani klonlash yoki yaratish
2. Kerakli paketlarni o'rnatish
   ```bash
   npm install
   ```
3. `.env` faylini yaratish va ma'lumotlar bazasi ma'lumotlarini to'ldirish
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_DATABASE=typeorm_demo
   PORT=3000
   ```
4. PostgreSQL ma'lumotlar bazasini yaratish (`typeorm_demo` nomli)
5. Loyihani ishga tushirish
   ```bash
   npm start
   ```

## API yo'llari

### Foydalanuvchilar uchun API yo'llari

#### 1. Yangi foydalanuvchini ro'yxatdan o'tkazish

- **HTTP Method**: POST
- **URL**: `/api/users`
- **Ta'rifi**: Yangi foydalanuvchi ma'lumotlarini yaratadi

##### So'rov (Request):

```json
POST /api/users
Content-Type: application/json

{
  "firstName": "Alisher",
  "lastName": "Navoiy",
  "email": "alisher@example.com",
  "age": 30
}
```

##### Javob (Response):

Muvaffaqiyatli bo'lsa (201 Created):

```json
{
  "id": 1,
  "firstName": "Alisher",
  "lastName": "Navoiy",
  "email": "alisher@example.com",
  "age": 30,
  "createdAt": "2023-03-10T12:00:00Z"
}
```

Xatolik bo'lsa (400 Bad Request):

```json
{
  "status": "error",
  "message": "Email allaqachon ro'yxatdan o'tgan"
}
```

#### 2. Barcha foydalanuvchilarni olish

- **HTTP Method**: GET
- **URL**: `/api/users`
- **Ta'rifi**: Barcha foydalanuvchilar ro'yxatini qaytaradi

##### So'rov (Request):

```
GET /api/users
```

##### Javob (Response):

```json
[
  {
    "id": 1,
    "firstName": "Alisher",
    "lastName": "Navoiy",
    "email": "alisher@example.com",
    "age": 30,
    "createdAt": "2023-03-10T12:00:00Z",
    "posts": []
  },
  {
    "id": 2,
    "firstName": "Bobur",
    "lastName": "Mirzo",
    "email": "bobur@example.com",
    "age": 25,
    "createdAt": "2023-03-11T14:30:00Z",
    "posts": []
  }
]
```

#### 3. Bitta foydalanuvchini ID bo'yicha olish

- **HTTP Method**: GET
- **URL**: `/api/users/:id`
- **Ta'rifi**: Berilgan ID bo'yicha foydalanuvchi ma'lumotlarini qaytaradi

##### So'rov (Request):

```
GET /api/users/1
```

##### Javob (Response):

Muvaffaqiyatli bo'lsa (200 OK):

```json
{
  "id": 1,
  "firstName": "Alisher",
  "lastName": "Navoiy",
  "email": "alisher@example.com",
  "age": 30,
  "createdAt": "2023-03-10T12:00:00Z",
  "posts": [
    {
      "id": 1,
      "title": "TypeORM haqida",
      "content": "TypeORM - bu zamonaviy ORM...",
      "createdAt": "2023-03-12T10:00:00Z"
    }
  ]
}
```

Foydalanuvchi topilmasa (404 Not Found):

```json
{
  "status": "error",
  "message": "Foydalanuvchi topilmadi"
}
```

#### 4. Foydalanuvchi ma'lumotlarini yangilash

- **HTTP Method**: PUT
- **URL**: `/api/users/:id`
- **Ta'rifi**: Berilgan ID bo'yicha foydalanuvchi ma'lumotlarini yangilaydi

##### So'rov (Request):

```json
PUT /api/users/1
Content-Type: application/json

{
  "firstName": "Alisher",
  "lastName": "Navoiy",
  "age": 32
}
```

##### Javob (Response):

Muvaffaqiyatli bo'lsa (200 OK):

```json
{
  "id": 1,
  "firstName": "Alisher",
  "lastName": "Navoiy",
  "email": "alisher@example.com",
  "age": 32,
  "createdAt": "2023-03-10T12:00:00Z",
  "updatedAt": "2023-03-15T09:30:00Z"
}
```

Foydalanuvchi topilmasa (404 Not Found):

```json
{
  "status": "error",
  "message": "Foydalanuvchi topilmadi"
}
```

#### 5. Foydalanuvchini o'chirish

- **HTTP Method**: DELETE
- **URL**: `/api/users/:id`
- **Ta'rifi**: Berilgan ID bo'yicha foydalanuvchini o'chiradi

##### So'rov (Request):

```
DELETE /api/users/2
```

##### Javob (Response):

Muvaffaqiyatli bo'lsa (200 OK):

```json
{
  "status": "success",
  "message": "Foydalanuvchi muvaffaqiyatli o'chirildi"
}
```

Foydalanuvchi topilmasa (404 Not Found):

```json
{
  "status": "error",
  "message": "Foydalanuvchi topilmadi"
}
```

### Maqolalar uchun API yo'llari

#### 1. Yangi maqola yaratish

- **HTTP Method**: POST
- **URL**: `/api/posts`
- **Ta'rifi**: Yangi maqola ma'lumotlarini yaratadi

##### So'rov (Request):

```json
POST /api/posts
Content-Type: application/json

{
  "title": "TypeORM haqida",
  "content": "TypeORM - bu zamonaviy ORM...",
  "userId": 1
}
```

##### Javob (Response):

Muvaffaqiyatli bo'lsa (201 Created):

```json
{
  "id": 1,
  "title": "TypeORM haqida",
  "content": "TypeORM - bu zamonaviy ORM...",
  "createdAt": "2023-03-12T10:00:00Z",
  "user": {
    "id": 1,
    "firstName": "Alisher",
    "lastName": "Navoiy"
  }
}
```

Xatolik bo'lsa (400 Bad Request):

```json
{
  "status": "error",
  "message": "Foydalanuvchi mavjud emas"
}
```

#### 2. Barcha maqolalarni olish

- **HTTP Method**: GET
- **URL**: `/api/posts`
- **Ta'rifi**: Barcha maqolalar ro'yxatini qaytaradi

##### So'rov (Request):

```
GET /api/posts
```

##### Javob (Response):

```json
[
  {
    "id": 1,
    "title": "TypeORM haqida",
    "content": "TypeORM - bu zamonaviy ORM...",
    "createdAt": "2023-03-12T10:00:00Z",
    "user": {
      "id": 1,
      "firstName": "Alisher",
      "lastName": "Navoiy"
    }
  },
  {
    "id": 2,
    "title": "Express.js va TypeScript",
    "content": "Express.js frameworki TypeScript bilan...",
    "createdAt": "2023-03-13T15:45:00Z",
    "user": {
      "id": 1,
      "firstName": "Alisher",
      "lastName": "Navoiy"
    }
  }
]
```

#### 3. Bitta maqolani ID bo'yicha olish

- **HTTP Method**: GET
- **URL**: `/api/posts/:id`
- **Ta'rifi**: Berilgan ID bo'yicha maqola ma'lumotlarini qaytaradi

##### So'rov (Request):

```
GET /api/posts/1
```

##### Javob (Response):

Muvaffaqiyatli bo'lsa (200 OK):

```json
{
  "id": 1,
  "title": "TypeORM haqida",
  "content": "TypeORM - bu zamonaviy ORM...",
  "createdAt": "2023-03-12T10:00:00Z",
  "user": {
    "id": 1,
    "firstName": "Alisher",
    "lastName": "Navoiy",
    "email": "alisher@example.com"
  }
}
```

Maqola topilmasa (404 Not Found):

```json
{
  "status": "error",
  "message": "Maqola topilmadi"
}
```

#### 4. Maqola ma'lumotlarini yangilash

- **HTTP Method**: PUT
- **URL**: `/api/posts/:id`
- **Ta'rifi**: Berilgan ID bo'yicha maqola ma'lumotlarini yangilaydi

##### So'rov (Request):

```json
PUT /api/posts/1
Content-Type: application/json

{
  "title": "TypeORM haqida yangilangan",
  "content": "TypeORM - bu zamonaviy ORM frameworki..."
}
```

##### Javob (Response):

Muvaffaqiyatli bo'lsa (200 OK):

```json
{
  "id": 1,
  "title": "TypeORM haqida yangilangan",
  "content": "TypeORM - bu zamonaviy ORM frameworki...",
  "createdAt": "2023-03-12T10:00:00Z",
  "updatedAt": "2023-03-14T08:15:00Z",
  "user": {
    "id": 1,
    "firstName": "Alisher",
    "lastName": "Navoiy"
  }
}
```

Maqola topilmasa (404 Not Found):

```json
{
  "status": "error",
  "message": "Maqola topilmadi"
}
```

#### 5. Maqolani o'chirish

- **HTTP Method**: DELETE
- **URL**: `/api/posts/:id`
- **Ta'rifi**: Berilgan ID bo'yicha maqolani o'chiradi

##### So'rov (Request):

```
DELETE /api/posts/2
```

##### Javob (Response):

Muvaffaqiyatli bo'lsa (200 OK):

```json
{
  "status": "success",
  "message": "Maqola muvaffaqiyatli o'chirildi"
}
```

Maqola topilmasa (404 Not Found):

```json
{
  "status": "error",
  "message": "Maqola topilmadi"
}
```

## Muhim TypeORM tushunchalari

### Entity yaratish

TypeORM'da ma'lumotlar bazasi jadvallari entity sinflar orqali ifodalanadi:

```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  age: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
```

### Repository bilan ishlash

TypeORM repository patterni qo'llab-quvvatlaydi:

```typescript
const userRepository = AppDataSource.getRepository(User);

// Barcha foydalanuvchilarni olish
const users = await userRepository.find();

// Foydalanuvchini ID bo'yicha olish
const user = await userRepository.findOne({ where: { id: userId } });

// Foydalanuvchini yaratish
const newUser = userRepository.create({
  firstName: "Alisher",
  lastName: "Navoiy",
  email: "alisher@example.com",
  age: 30,
});
await userRepository.save(newUser);

// Foydalanuvchini yangilash
await userRepository.update(userId, { age: 32 });

// Foydalanuvchini o'chirish
await userRepository.delete(userId);
```

### Relations (Munosabatlar)

TypeORM turli xil munosabatlarni qo'llab-quvvatlaydi:

1. **@OneToOne** - Bir foydalanuvchi bitta profilga ega
2. **@OneToMany/@ManyToOne** - Bir foydalanuvchi ko'p maqolalarga ega
3. **@ManyToMany** - Ko'p foydalanuvchilar ko'p kategoriyalarga ega bo'lishi mumkin
