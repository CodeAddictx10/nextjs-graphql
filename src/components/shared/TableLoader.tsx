"use client";


const TableSkeletonLoader = ({ rows = 5, columns = 4 }) => {
    return (
        <div className="animate-pulse space-y-2 w-full border rounded-md overflow-hidden">
            <div className="flex bg-gray-200 dark:bg-gray-700">
                {Array.from({ length: columns }).map((_, i) => (
                    <div
                        key={i}
                        className="h-10 w-full px-4 py-2 border-r last:border-r-0">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto" />
                    </div>
                ))}
            </div>

            {Array.from({ length: rows }).map((_, rowIdx) => (
                <div key={rowIdx} className="flex bg-white dark:bg-gray-800">
                    {Array.from({ length: columns }).map((_, colIdx) => (
                        <div
                            key={colIdx}
                            className="h-10 w-full px-4 py-2 border border-gray-200 dark:border-gray-700">
                            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3" />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TableSkeletonLoader;
