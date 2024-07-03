/**
 * @description Determines if an element exists within a given range in an array. It
 * does this by dividing the range into two sub-ranges and then recursively searching
 * for the element within each sub-range.
 * 
 * @param {array} arr - array that contains the values to be searched for the given
 * `x`.
 * 
 * @param {integer} x - value being searched for in the array.
 * 
 * @param {integer} start - index of the leftmost element in the array that the
 * function will search for the specified `x` value.
 * 
 * @param {integer} end - 2nd index of the array where the element of interest is located.
 * 
 * @returns {boolean} a boolean value indicating whether the specified element exists
 * in the given array within the specified range.
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
 * @description Retrieves and returns the application ID based on provided parameters
 * and database queries.
 * 
 * @returns {integer} a unique identifier for the specified application.
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
 * @description Takes an array of integers representing a 2D grid, where each integer
 * represents the alive status of a cell in the grid. It returns an array of integers
 * representing the next generation of cells, with alive cells having a value of 1
 * and dead cells having a value of 0.
 * 
 * @param {array} cells - 2D grid of cells, where each cell can be in one of two
 * states (alive or dead), and the function generates the next generation of cells
 * based on the current state of the grid.
 * 
 * @returns {array} a new generation of cells, represented as an array of booleans
 * indicating whether each cell is alive or not.
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
