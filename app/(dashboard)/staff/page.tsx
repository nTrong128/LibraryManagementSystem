import { Staff } from "@/components/component/staff";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { VenetianMask } from "lucide-react";

export default function StaffPage() {
    return(
        <main>
            <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
            <VenetianMask />
              <CardTitle>Nhân viên</CardTitle>
            </div>

            <Button>Thêm nhân viên</Button>
          </div>
        </CardHeader>
      </Card>
            <Staff/>
        </main>
    )
}