import {Author} from "@/components/component/author";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PersonStanding} from "lucide-react";
export default function AuthorPage() {
  return (
    <main>
      <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
              <PersonStanding />
              <CardTitle>Tác giả</CardTitle>
            </div>

            <Button>Thêm tác giả</Button>
          </div>
        </CardHeader>
      </Card>
      <Author />
    </main>
  );
}
