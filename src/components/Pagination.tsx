import React from 'react';

interface PaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, onPageChange}) => {
    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        onPageChange(currentPage + 1);
    }

    return (
        <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 1}>Pervious</button>
            <span>Page{currentPage}</span>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default Pagination;