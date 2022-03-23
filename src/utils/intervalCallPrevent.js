export default function intervalCall(interval) {
  // interval 시간 안에 다시 호출된 함수 콜은 무시한다
  let elapsed = true;
  return fn => {
    if (!elapsed) {
      return; // 마지막 호출 후 제한된 경과시간이 지나지 않은 경우 리턴
    }
    elapsed = false;
    fn();
    setTimeout(() => {
      elapsed = true;
    }, interval);
  };
}
