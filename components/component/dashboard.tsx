"use client";

import {SummaryTable} from "./summary-table";

export function DashboardContent(params: {
  books: any;
  authors: any;
  publishers: any;
  categories: any;
  readers: any;
  employees: any;
  checkouts: any;
}) {
  const books = params.books;
  const authors = params.authors;
  const publishers = params.publishers;
  const categories = params.categories;
  const readers = params.readers;
  const employees = params.employees;
  const checkouts = params.checkouts;
  return (
    <div className="max-w-6xl mx-auto py-10 flex gap-y-6 flex-col">
      <div className="rounded-md border p-4 shadow-md">
        <span className="font-bold text-3xl">Thống kê sách</span>
        <SummaryTable
          data={books.books}
          columns={["ID", "Tên sách", "Số lần mượn"]}
          header={["id", "bookName", "numberOfCheckouts"]}
        />
        <p className="font-semibold text-xl me-2 text-end">
          Tổng số sách: {params.books.numberOfBooks}
        </p>
      </div>
      <div className="rounded-md border p-4 shadow-md">
        <span className="font-bold text-3xl">Thống kê tác giả</span>
        <SummaryTable
          data={authors.authors}
          columns={["ID", "Tên tác giả", "Số lượng sách"]}
          header={["id", "authorName", "numberOfBooks"]}
        />
        <p className="font-semibold text-xl me-2 text-end">
          Tổng số tác giả: {params.authors.numberOfAuthors}
        </p>
      </div>
      <div className="rounded-md border p-4 shadow-md">
        <span className="font-bold text-3xl">Thống kê nhà xuất bản</span>
        <SummaryTable
          data={publishers.publishers}
          columns={["ID", "Tên nhà xuất bản", "Số lượng sách"]}
          header={["id", "publisherName", "numberOfBooks"]}
        />
        <p className="font-semibold text-xl me-2 text-end">
          Tổng số nhà xuất bản: {publishers.numberOfPublishers}
        </p>
      </div>
      <div className="rounded-md border p-4 shadow-md">
        <span className="font-bold text-3xl">Thống kê thể loại</span>
        <SummaryTable
          data={categories.categories}
          columns={["ID", "Tên thể loại", "Số lượng sách"]}
          header={["id", "categoryName", "numberOfBooks"]}
        />
        <p className="font-semibold text-xl me-2 text-end">
          Tổng số thể loại: {categories.numberOfCategories}
        </p>
      </div>
      <div className="rounded-md border p-4 shadow-md">
        <span className="font-bold text-3xl">Thống kê độc giả</span>
        <SummaryTable
          data={readers.readers}
          columns={[
            "ID",
            "Tên độc giả",
            "Số lượng đã sách mượn",
            "Số lần mượn",
          ]}
          header={["id", "readerName", "numberOfBooks", "numberOfCheckouts"]}
        />
        <p className="font-semibold text-xl me-2 text-end">
          Tổng số độc giả: {readers.numberOfReaders}
        </p>
      </div>

      {employees && (
        <div className="rounded-md border p-4 shadow-md">
          <span className="font-bold text-3xl">Thống kê nhân viên</span>
          <SummaryTable
            data={employees.employees}
            columns={["ID", "Tên nhân viên", "Số đơn mượn đã xử lý"]}
            header={["id", "fullName", "numberOfCheckouts"]}
          />
          <p className="font-semibold text-xl me-2 text-end">
            Tổng số nhân viên: {employees.numberOfEmployees}
          </p>
        </div>
      )}
      <div className="rounded-md border p-4 shadow-md">
        <span className="font-bold text-3xl">Thống kê đơn mượn sách</span>
        <SummaryTable
          data={checkouts.checkouts}
          columns={["ID", "Số lượng sách mượn"]}
          header={["id", "numberOfDetails"]}
        />
        <p className="font-semibold text-xl me-2 text-end">
          Tổng số đơn mượn: {checkouts.numberOfCheckouts}
        </p>
      </div>
    </div>
  );
}
