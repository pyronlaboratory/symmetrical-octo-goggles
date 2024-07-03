/**
 * @description Performs a binary search for an element `x` in an array `arr`. It
 * compares the value of `x` with the middle element of the array, and recursively
 * calls itself if the comparison yields false. If the comparison is true, the function
 * returns `true`.
 * 
 * @param {array} arr - array that the function is searching for the specified value
 * `x`.
 * 
 * @param {number} x - value being searched for in the array.
 * 
 * @param {integer} start - index of the left side of the interval where the searched
 * value is located.
 * 
 * @param {integer} end - 2nd index of the array where the given value `x` should be
 * searched starting from the `start` index.
 * 
 * @returns {boolean} a boolean value indicating whether the specified element exists
 * within the given range of an array.
 */
const search = (arr, x, start, end) => {
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
 * @description Retrieves the application ID based on provided parameters and logs
 * the result to the pipeline.
 * 
 * @returns {string} a unique identifier for a business application.
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
 * @description Takes an array of cell states as input, generates a new generation
 * of cells based on the Cellular Automata rules, and returns the new generation as
 * an array of cell states.
 * 
 * @param {array} cells - 2D grid of living and dead cells, which is used to generate
 * the next generation of cells through a process of iterative neighborhood counting
 * and alive/dead determination.
 * 
 * @returns {array} an array of alive cells in the next generation, generated based
 * on the input cells.
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
