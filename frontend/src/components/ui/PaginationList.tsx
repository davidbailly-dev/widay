import Button from "./Button";

interface PaginationProps {
    activePage?: number;
    className?: string;
    onPageChange: (page: number) => void;
    totalPages?: number;
}

interface PageNumberProps {
    onClick: () => void;
    isActive: boolean;
    pageNum: number;
}

export default function PaginationList({
    activePage = 1,
    className = '',
    onPageChange,
    totalPages = 1,
}: PaginationProps) {
    // Create an array of each page from total pages (page 1, page 2, page 3, etc.)
    var pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Navigate to next page
    const goToNextPage = () => {
        const newPage = activePage + 1;

        if (newPage >= 1 && newPage <= totalPages) {
            // Set the new active page
            onPageChange(newPage);
        }
    }

    // Navigate to previous page
    const goToPrevPage = () => {
        const newPage = activePage - 1;

        if (newPage >= 1 && newPage <= totalPages) {
            // Set the new active page
            onPageChange(newPage);
        }
    }

    return (
        <div className={`items-center space-x-2 ${className}`}>
            <Button
                onClick={goToPrevPage}
            >
                Précédent
            </Button>
            <span className="space-x-2">
                {pages.map((pageNum) => (
                    <PageNumber
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        isActive={pageNum === activePage}
                        pageNum={pageNum}
                    />
                ))}
            </span>
            <span className="">
                {totalPages} page(s)
            </span>
            <Button
                onClick={goToNextPage}
            >
                Suivant
            </Button>
        </div>
    );
}

function PageNumber({
    isActive = false,
    onClick,
    pageNum = 1
}: PageNumberProps ) {
    return (
        <Button
            className={`px-4`}
            active={isActive}
            onClick={onClick}
        >
            {pageNum.toString()}
        </Button>
    );
}