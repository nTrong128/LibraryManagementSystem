import {z} from "zod";

export const bookSchema = z.object({
  name: z.string().min(1, {message: "Tên sách không được để trống"}),
  categoryId: z.preprocess((val) => {
    if (typeof val === "string") {
      return parseFloat(val);
    }
    return val;
  }, z.number().min(0, {message: "Thể loại không được để trống"})),
  authorId: z.preprocess((val) => {
    if (typeof val === "string") {
      return parseFloat(val);
    }
    return val;
  }, z.number().min(0, {message: "Tác giả không được để trống"})),
  publisherId: z.preprocess((val) => {
    if (typeof val === "string") {
      return parseFloat(val);
    }
    return val;
  }, z.number().min(0, {message: "Nhà xuất bản không được để trống"})),
  publicationYear: z.preprocess((val) => {
    if (typeof val === "string") {
      return parseFloat(val);
    }
    return val;
  }, z.number().min(0, {message: "Năm xuất bản không được để trống"})),
});

export const authorSchema = z.object({
  authorName: z.string().min(1, {message: "Tên tác giả không được để trống"}),
  website: z
    .string()
    .min(1, {message: "Website không được để trống"})
    .url({message: "Website không hợp lệ"}),
  note: z.string().min(1, {message: "Mô tả không được để trống"}),
});

export const publisherSchema = z.object({
  publisherName: z
    .string()
    .min(1, {message: "Tên nhà xuất bản không được để trống"}),
  address: z.string().min(1, {message: "Địa chỉ không được để trống"}),
  email: z.string().email({message: "Email không hợp lệ"}),
  representativeInfo: z
    .string()
    .min(1, {message: "Thông tin đại diện không được để trống"}),
});

export const categorySchema = z.object({
  categoryName: z
    .string()
    .min(1, {message: "Tên thể loại không được để trống"}),
});

export const readerSchema = z.object({
  readerName: z.string().min(1, {message: "Tên đọc giả không được để trống"}),
  address: z.string().min(1, {message: "Địa chỉ không được để trống"}),
});

export const employeeSchema = z.object({
  fullName: z.string().min(1, {message: "Tên nhân viên không được để trống"}),
  phoneNumber: z
    .string()
    .startsWith("0", {message: "Số điện thoại phải bắt đầu bằng số 0"})
    .min(10, {message: "Số điện thoại không hợp lệ"}),
  birthDate: z.string().optional(),
});

export const accountSchema = z
  .object({
    username: z.string().min(1, {message: "Tên đăng nhập không được để trống"}),
    password: z.string().min(1, {message: "Mật khẩu không được để trống"}),
    retype_password: z
      .string()
      .min(1, {message: "Mật khẩu không được để trống"}),
    role: z.string().optional(),
    employeeId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải từ 8 ký tự.",
        path: ["password"],
      });
    }
    if (!data.password.match(/[A-Z]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 chữ hoa.",
        path: ["password"],
      });
    }
    if (!data.password.match(/[a-z]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 chữ thường.",
        path: ["password"],
      });
    }
    if (!data.password.match(/[0-9]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 số.",
        path: ["password"],
      });
    }
    if (!data.password.match(/[^A-Za-z0-9]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 ký tự đặc biệt.",
        path: ["password"],
      });
    }
    if (data.password !== data.retype_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu không khớp.",
        path: ["retype_password"],
      });
    }
  });

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, {message: "Mật khẩu cũ không được để trống"}),
    newPassword: z
      .string()
      .min(1, {message: "Mật khẩu mới không được để trống"}),
    retypePassword: z.string().min(1, {message: "Mật khẩu không khớp"}),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải từ 8 ký tự.",
        path: ["password"],
      });
    }
    if (!data.newPassword.match(/[A-Z]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 chữ hoa.",
        path: ["password"],
      });
    }
    if (!data.newPassword.match(/[a-z]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 chữ thường.",
        path: ["password"],
      });
    }
    if (!data.newPassword.match(/[0-9]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 số.",
        path: ["password"],
      });
    }
    if (!data.newPassword.match(/[^A-Za-z0-9]/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu phải có ít nhất 1 ký tự đặc biệt.",
        path: ["password"],
      });
    }

    if (data.newPassword !== data.retypePassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu không khớp.",
        path: ["retype_password"],
      });
    }
  });
