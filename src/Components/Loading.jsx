const Loading = () => {
  return (
    <div className="fixed inset-0 bg-slate-500/40 flex justify-center items-center z-10">
      <div className="animate-spin w-16 h-16 sm:h-28 sm:w-28 flex justify-center items-center rounded-full border-4 bg-transparent border-t-violet-700"></div>
    </div>
  );
};

export default Loading;
