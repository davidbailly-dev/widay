import Button from "./Button";

interface PaginationProps {
    activePage: number;
    totalPages: number;
}

interface PageNumberProps {
    pageNum: number;
    isActive: boolean;
}

export default function Pagination({
    activePage = 1,
    totalPages = 1,
}: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div>
            <Button>Précédent</Button>
            {pages.map((pageNum) => (
                <PageNumber
                    key={pageNum}
                    pageNum={pageNum}
                    isActive={pageNum === activePage}
                />
            ))}
            <Button>Suivant</Button>
        </div>
    );
}

function PageNumber({
    pageNum = 1,
    isActive = false
}: PageNumberProps ) {
    return (
        <span className={isActive ? "font-bold" : ""}>{pageNum}</span>
    );
}