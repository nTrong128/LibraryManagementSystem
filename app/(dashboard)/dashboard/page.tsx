"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import {ResponsiveBar} from "@nivo/bar";
import {JSX, ClassAttributes, HTMLAttributes} from "react";

export default function DashboardPage() {
  return (
    <div className="grid min-h-screen gap-4 p-4 md:gap-8 md:p-10">
      <Card>
        <CardContent className="flex flex-col gap-4 m-2 mb-0">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <CardTitle>Tổng số sách</CardTitle>
              <CardDescription>
                Số lượng sách hiện có trong thư viện
              </CardDescription>
              <div className="text-4xl font-bold">1,234</div>
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle>Thành viên</CardTitle>
              <CardDescription>Số lượng thành viên hoạt động</CardDescription>
              <div className="text-4xl font-bold">567</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <CardTitle>Mượn gần đây</CardTitle>
              <CardDescription>
                Sách được mượn trong 7 ngày gần nhất
              </CardDescription>
              <ul className="grid gap-2 text-sm list-disc list-inside md:text-base">
                <li>
                  The Flash
                  <span className="text-gray-500"> - 10/15/2023</span>
                </li>
                <li>
                  Spiderman
                  <span className="text-gray-500"> - 10/17/2023</span>
                </li>
                <li>
                  Back to the Future
                  <span className="text-gray-500"> - 10/20/2023</span>
                </li>
                <li>
                  Harry Potter
                  <span className="text-gray-500"> - 10/22/2023</span>
                </li>
                <li>
                  The Lord of the Ring
                  <span className="text-gray-500"> - 10/25/2023</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle>Sách phổ biến</CardTitle>
              <CardDescription>
                Sách được mượn nhiều nhất 30 ngày gần đây
              </CardDescription>
              <ul className="grid gap-2 text-sm list-disc list-inside md:text-base">
                <li>
                  Attack on Titan
                  <span className="text-gray-500"> - 25 lần</span>
                </li>
                <li>
                  Breaking Bad
                  <span className="text-gray-500"> - 20 lần</span>
                </li>
                <li>
                  Naruto
                  <span className="text-gray-500"> - 18 lần</span>
                </li>
                <li>
                  Frieren: Beyond Journey&apos;s End
                  <span className="text-gray-500"> - 15 lần</span>
                </li>
                <li>
                  Jujutsu Kaisen
                  <span className="text-gray-500"> - 12 lần</span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardDescription>Thống kê</CardDescription>
                <CardTitle>Thống kê mượn sách các thác vừa qua</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart className="w-full aspect-[1/0.2]" />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function BarChart(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>
) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          {name: "Jan", count: 111},
          {name: "Feb", count: 157},
          {name: "Mar", count: 129},
          {name: "Apr", count: 150},
          {name: "May", count: 119},
          {name: "Jun", count: 72},
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{top: 0, right: 0, bottom: 40, left: 40}}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({id}) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}
