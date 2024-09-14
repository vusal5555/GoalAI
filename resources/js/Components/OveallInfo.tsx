const OverallInfo = () => {
  return (
    <div className="bg-transparent border rounded-lg p-6  text-white w-full  shadow-gray-200/30  shadow-lg">
      <h2 className="text-xl font-bold text-left mb-10">Overall Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="text-center bg-primary-foreground text-slate-300 border rounded-lg p-4 shadow-lg">
          <h1 className="text-3xl font-extrabold">42</h1>
          <p className="text-sm mt-2">Tasks done for all time</p>
        </div>
        <div className="text-center bg-primary-foreground text-slate-300  border rounded-lg p-4 shadow-lg">
          <h1 className="text-3xl font-extrabold">23</h1>
          <p className="text-sm mt-2">Goals are stopped</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="text-center bg-primary-foreground text-slate-300 border rounded-lg p-4 shadow-md break-words">
          <h3 className="text-xl font-semibold">28</h3>
          <p className="text-sm mt-2">Projects</p>
        </div>
        <div className="text-center bg-primary-foreground text-slate-300 border rounded-lg p-4 shadow-md break-words">
          <h3 className="text-xl font-semibold">14</h3>
          <p className="text-sm mt-2">In Progress</p>
        </div>
        <div className="text-center bg-primary-foreground text-slate-300 border rounded-lg p-4 shadow-md break-words">
          <h3 className="text-xl font-semibold">11</h3>
          <p className="text-sm mt-2">Completed</p>
        </div>
      </div>
    </div>
  );
};

export default OverallInfo;
