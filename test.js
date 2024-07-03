/**
 * @description Takes an array, a target value, and two indices representing the start
 * and end points of the search range. It returns `true` if the target value is found
 * within the range, or `false` otherwise.
 * 
 * @param {array} arr - 1D array to be searched for the target element `x`.
 * 
 * @param {number} x - searched value in the array.
 * 
 * @param {integer} start - index of the left-most element that should be searched
 * within the array for the specified value `x`.
 * 
 * @param {integer} end - 2nd point of the range for searching the desired element
 * in the array.
 * 
 * @returns {boolean} a boolean value indicating whether the specified element exists
 * in the array between the start and end indices.
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
 * @description Retrieves and returns an application ID based on input parameters.
 * It uses the `gs.log()` method to log messages related to the function's execution.
 * 
 * @returns {integer} a unique identifier for an application.
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
 * @description Generates a new generation of cells based on the current state of the
 * cells, using a simple algorithm that takes into account the neighbors of each cell
 * and whether they are alive or not.
 * 
 * @param {array} cells - 2D array of cells to be generated into the next generation.
 * 
 * @returns {array} a new generation of cells, represented as an array of integers
 * indicating whether each cell is alive or dead.
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
