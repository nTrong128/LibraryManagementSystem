"use client";

import {SummaryTable} from "./summary-table";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

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
    <Tabs defaultValue="books">
      <TabsList>
        <TabsTrigger value="books">Thống kê sách</TabsTrigger>
        <TabsTrigger value="authors">Thống kê tác giả</TabsTrigger>
        <TabsTrigger value="publishers">Thống kê nhà xuất bản</TabsTrigger>
        <TabsTrigger value="categories">Thống kê thể loại sách</TabsTrigger>
        <TabsTrigger value="checkouts">Thống kê đơn mượn</TabsTrigger>
        <TabsTrigger value="readers">Thống kê đọc giả</TabsTrigger>
        {employees && (
          <TabsTrigger value="employees">Thống kê nhân viên</TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="books">
        <div className="rounded-md border p-4 shadow-md">
          <span className="font-bold text-3xl">Thống kê sách</span>
          <SummaryTable
            data={books.books}
            columns={["ID sách", "Tên sách", "Số lần mượn"]}
            header={["id", "bookName", "numberOfCheckouts"]}
          />
          <p className="font-semibold text-xl me-2 text-end">
            Tổng số sách: {params.books.numberOfBooks}
          </p>
        </div>
      </TabsContent>
      <TabsContent value="authors">
        <div className="rounded-md border p-4 shadow-md">
          <span className="font-bold text-3xl">Thống kê tác giả</span>
          <SummaryTable
            data={authors.authors}
            columns={["ID tác giả", "Tên tác giả", "Số lượng sách"]}
            header={["id", "authorName", "numberOfBooks"]}
          />
          <p className="font-semibold text-xl me-2 text-end">
            Tổng số tác giả: {params.authors.numberOfAuthors}
          </p>
        </div>
      </TabsContent>
      <TabsContent value="publishers">
        <div className="rounded-md border p-4 shadow-md">
          <span className="font-bold text-3xl">Thống kê nhà xuất bản</span>
          <SummaryTable
            data={publishers.publishers}
            columns={["ID nhà xuất bản", "Tên nhà xuất bản", "Số lượng sách"]}
            header={["id", "publisherName", "numberOfBooks"]}
          />
          <p className="font-semibold text-xl me-2 text-end">
            Tổng số nhà xuất bản: {publishers.numberOfPublishers}
          </p>
        </div>
      </TabsContent>
      <TabsContent value="categories">
        <div className="rounded-md border p-4 shadow-md">
          <span className="font-bold text-3xl">Thống kê thể loại</span>
          <SummaryTable
            data={categories.categories}
            columns={["ID loại", "Tên thể loại", "Số lượng sách"]}
            header={["id", "categoryName", "numberOfBooks"]}
          />
          <p className="font-semibold text-xl me-2 text-end">
            Tổng số thể loại: {categories.numberOfCategories}
          </p>
        </div>
      </TabsContent>
      <TabsContent value="checkouts">
        <div className="rounded-md border p-4 shadow-md">
          <span className="font-bold text-3xl">Thống kê đơn mượn sách</span>
          <SummaryTable
            data={checkouts.checkouts}
            columns={["ID thẻ mượn", "Số lượng sách mượn"]}
            header={["id", "numberOfDetails"]}
          />
          <p className="font-semibold text-xl me-2 text-end">
            Tổng số đơn mượn: {checkouts.numberOfCheckouts}
          </p>
        </div>
      </TabsContent>
      <TabsContent value="readers">
        <div className="rounded-md border p-4 shadow-md">
          <span className="font-bold text-3xl">Thống kê độc giả</span>
          <SummaryTable
            data={readers.readers}
            columns={[
              "ID độc giả",
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
      </TabsContent>
      {employees && (
        <TabsContent value="employees">
          <div className="rounded-md border p-4 shadow-md">
            <span className="font-bold text-3xl">Thống kê nhân viên</span>
            <SummaryTable
              data={employees.employees}
              columns={[
                "ID nhân viên",
                "Tên nhân viên",
                "Số đơn mượn đã xử lý",
              ]}
              header={["id", "fullName", "numberOfCheckouts"]}
            />
            <p className="font-semibold text-xl me-2 text-end">
              Tổng số nhân viên: {employees.numberOfEmployees}
            </p>
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
}
