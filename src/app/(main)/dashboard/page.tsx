const Dashboard = () => {
  return (
    <div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50">
            <div className="group w-full rounded-lg bg-[#673ab7] p-5 transition relative duration-300 cursor-pointer h-full">
              <p className="text-white text-2xl"></p>
              <p className="text-white text-sm"></p>
              <div></div>
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50"></div>
          <div className="aspect-video rounded-xl bg-muted/50"></div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </div>
  );
};

export default Dashboard;
