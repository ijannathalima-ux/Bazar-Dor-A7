
const LoadingPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0C0D10]">
            <div className="text-center">
                <p className="mt-4 text-2xl  font-bold  text-gray-500">
                    বাজারদরের তথ্য লোড হচ্ছে....
                </p>
                <div className="mx-auto mt-4 h-1 w-32 overflow-hidden rounded-full bg-gray-700">
                    <div className="h-full w-1/2 animate-pulse rounded-full bg-green-400" />
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;
