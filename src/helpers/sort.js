const sortTask = (array) => {
  const copyArray = [...array].sort((a, b) => a.isCheck > b.isCheck ? 1 : a.isCheck < b.isCheck ? -1 : 0);
  return copyArray;
}

export default sortTask;