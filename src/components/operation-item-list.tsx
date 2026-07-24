/**
 * 1compte : green
 * 2Emprunt : red
 * 3Rembourser : blue
 * 4Social : orange
 * 5Adhesion : green/1
 **/

{
  /* <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2">
  <div
    className="bg-blue-600 h-2.5 rounded-full"
    style={{ width: `${(wh.currentStock / wh.capacity) * 100}%` }}
  ></div>
</div>; */
}

{/* <div className="grid gap-4 md:grid-cols-7">
  <Card className="col-span-4">
    <CardHeader>
      <CardTitle>Ventes Analyses (7 jours)</CardTitle>
    </CardHeader>
    <CardContent className="pl-2">
      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `€${value}`}
            />
            <Tooltip />
            <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>

  {/* Activity Feed (Point 8) 
  <Card className="col-span-3">
    <CardHeader>
      <CardTitle>Activity Feed</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        {mockRecentActivity.map((activity) => (
          <div key={activity.id} className="flex">
            <div className="relative mr-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.user}
              </p>
              <p className="text-sm text-slate-500">{activity.action}</p>
              <p className="text-xs text-slate-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
</div>; */}

import OperationItem from "./operation-item";

const OperationItemList = () => {
  return (
    <div>
      <OperationItem />
      <OperationItem />
      <OperationItem />
      <OperationItem />
      <OperationItem />
    </div>
  );
};

export default OperationItemList;
