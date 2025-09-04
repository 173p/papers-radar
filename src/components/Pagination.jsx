const DOTS = '...';

export default function Pagination({ currentPage, totalPages, onPageChange }) {

    const getPageNumbers = () => {
        // Case 1: total pages are 7 or less, show all page numbers
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Case 2: current page is near the beginning
        if (currentPage < 5) {
            return [1, 2, 3, 4, 5, DOTS, totalPages];
        }

        // Case 3: current page is near the end
        if (currentPage > totalPages - 4) {
            return [1, DOTS, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }

        // Case 4: current page is somewhere in the middle
        return [1, DOTS, currentPage - 1, currentPage, currentPage + 1, DOTS, totalPages];
    };

    const handlePrevious = () => onPageChange(currentPage - 1);
    const handleNext = () => onPageChange(currentPage + 1);

    // Don't render component if theres only one page
    if (totalPages <= 1) {
        return null;
    }
    return (
        <div className="mt-8 flex justify-between items-center">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Previous
            </button>

            <div className="flex items-center space-x-1">
                {getPageNumbers().map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return <span key={`${DOTS}-${index}`} className="px-4 py-2">&#8230;</span>;
                    }

                    return (
                        <button
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                currentPage === pageNumber
                                    ? 'bg-blue-700 text-white'
                                    : 'bg-white text-blue-700 hover:bg-blue-100'
                            }`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
}