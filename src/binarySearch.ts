export const binarySearch = (arr: number[], target: number): number => {
    const n = arr.length;
    let l = 0;
    let r = n - 1;

    while (l <= r) {
        let mid = l + Math.floor((r - l) / 2);

        if (arr[mid] === target) return mid;

        if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }

    return -1;
};
