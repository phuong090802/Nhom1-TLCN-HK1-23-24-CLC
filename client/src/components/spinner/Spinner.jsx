import ScaleLoader from "react-spinners/ScaleLoader";

const Spinner = () => {
    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-gray-400/50 z-[100]">
            <div className="w-full h-full flex justify-center content-center items-center">
                <ScaleLoader
                    color={'#FFFAFF'}
                    loading={true}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    );
}

export default Spinner