import Button from "./Button";

interface PaginationProps {
    activePage?: number;
    totalPages?: number;
}

interface PageNumberProps {
    pageNum: number;
    isActive: boolean;
}

export default function PaginationList({
    activePage = 1,
    totalPages = 1,
}: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="space-x-2">
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
        <Button className={`px-4`} active={isActive}>{pageNum.toString()}</Button>
    );
}