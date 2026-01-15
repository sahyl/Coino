"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { buildPageNumbers, cn, ELLIPSIS } from "@/lib/utils";
import { CurrencyIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function CoinsPagination({
  currentPage,
  totalPages,
  hasMorePages,
}: Pagination) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/coins?page=${page}`);
  };
  const pageNumbers = buildPageNumbers(currentPage, totalPages);

  const isLastPage = !hasMorePages || currentPage === totalPages;
  return (
    <Pagination  className="mt-2" id="coins-pagination">
      <PaginationContent className="pagination-content">
        <PaginationItem className="pagination-control prev">
          <PaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            className={
              currentPage === 1 ? "control-disabled" : "control-button"
            }
          />
        </PaginationItem>
        <div className="pagination-pages">
          {pageNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {page === ELLIPSIS ? (
                <span className="ellipses">...</span>
              ) : (
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  className={cn("page-link", {
                    "page-link-active": currentPage === page
                  })}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </div>

        <PaginationItem className="pagination-control next">
          <PaginationNext
            onClick={() => !isLastPage && handlePageChange(currentPage + 1)}
            className={isLastPage ? "control-disabled" : "control-button"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
