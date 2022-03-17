export default function modifySize(
  modifiedWidth,
  modifiedHeight,
  naturalWidth,
  naturalHeight,
  boxWidth,
  boxHeight
) {
  const aspectRatio = naturalWidth / naturalHeight;
  (modifiedWidth = naturalWidth), (modifiedHeight = naturalHeight);
  if (
    naturalWidth < boxWidth &&
    naturalWidth / boxWidth < naturalHeight / boxHeight
  ) {
    modifiedWidth = boxWidth;
    modifiedHeight = modifiedWidth / aspectRatio;
  } else if (
    naturalHeight < boxHeight &&
    naturalHeight / boxHeight < naturalWidth / boxWidth
  ) {
    modifiedHeight = boxHeight;
    modifiedWidth = modifiedHeight * aspectRatio;
  }

  return { modifiedWidth, modifiedHeight };
}
