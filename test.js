/**
 * @description Checks if an element exists within a sorted array. It does so by
 * determining if the middle element is equal to the given `x`, and if not, it
 * recursively calls itself on the left and right subarrays.
 * 
 * @param {array} arr - array to be searched for the specified value `x`.
 * 
 * @param {number} x - value being searched for in the array.
 * 
 * @param {number} start - index of the array where the search should start.
 * 
 * @param {number} end - 2nd index of the array that the function searches for the
 * specified value `x`.
 * 
 * @returns {boolean} a boolean value indicating whether the element `x` is present
 * in the array `arr` between `start` and `end`.
 */
const searching = (arr, x, start, end) => {
  if (start > end) return false;
  let mid = Math.floor((start + end) / 2);
  if (arr[mid] === x) return true;
  if (arr[mid] > x) {
    return search(arr, x, start, mid - 1);
  } else {
    return search(arr, x, mid + 1, end);
  }
};


/**
 * @description Retrieves and returns the application ID based on the input parameters.
 * If the app name is not provided, it uses the default value from the GlideRecord.
 * 
 * @returns {string} a string representing the ID of the specified application.
 */
const getApplicationID = () => {
  var appID = "";
  gs.log("appid: " + this.getParameter("sysparm_appName"), "pipeline");
  var grAppID = new GlideRecord("cmdb_ci_business_app");
  if (grAppID.get(this.getParameter("sysparm_appname"))) {
    appID = grAppID.number.toString();
    gs.log("appid: " + appID, "pipeline");
  }
 return appID;
}

/**
 * @description Generates a new population of cells based on the current generation,
 * using a neighborhood-based algorithm that considers the neighbors' states to
 * determine each cell's fate.
 * 
 * @param {array} cells - 2D grid of cells to be evolved, with each cell value
 * representing whether it is alive or dead.
 * 
 * @returns {array} a new generation of cells, represented as a two-dimensional array
 * of alive or dead cells.
 */
function newGeneration(cells) {
  const nextGeneration = []
  for (let i = 0; i < cells.length; i++) {
    const nextGenerationRow = []
    for (let j = 0; j < cells[i].length; j++) {
      let neighbourCount = 0
      if (i > 0 && j > 0) neighbourCount += cells[i - 1][j - 1]
      if (i > 0) neighbourCount += cells[i - 1][j]
      if (i > 0 && j < cells[i].length - 1)
        neighbourCount += cells[i - 1][j + 1]
      if (j > 0) neighbourCount += cells[i][j - 1]
      if (j < cells[i].length - 1) neighbourCount += cells[i][j + 1]
      if (i < cells.length - 1 && j > 0) neighbourCount += cells[i + 1][j - 1]
      if (i < cells.length - 1) neighbourCount += cells[i + 1][j]
      if (i < cells.length - 1 && j < cells[i].length - 1)
        neighbourCount += cells[i + 1][j + 1]
      const alive = cells[i][j] === 1
      const cellIsAlive =
        (alive && neighbourCount >= 2 && neighbourCount <= 3) ||
        (!alive && neighbourCount === 3)
      nextGenerationRow.push(cellIsAlive ? 1 : 0)
    }
    nextGeneration.push(nextGenerationRow)
  }
  return nextGeneration
}
