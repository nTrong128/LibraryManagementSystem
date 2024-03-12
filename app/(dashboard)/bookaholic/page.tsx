import { BookaholicPage } from "@/components/component/bookaholic"
import { Card, CardTitle, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserSearch } from "lucide-react"

export default function Bookaholic(){
    return(
        <main>
            <Card className="flex-1">
        <CardHeader className="md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2">
                <UserSearch />
              <CardTitle>Độc giả</CardTitle>
            </div>

            <Button>Thêm độc giả</Button>
          </div>
        </CardHeader>
      </Card>
            <BookaholicPage/>
        </main>
    )
}