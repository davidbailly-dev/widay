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
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className={`space-x-2 ${className}`}>
            <Button>Précédent</Button>
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
            <Button>Suivant</Button>
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