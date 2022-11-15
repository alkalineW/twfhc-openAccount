function handleQListIcon() {
  const qList = document.getElementsByClassName('q-list');
  const qListLength = qList.length;
  let incertCss = '';
  for (let i = 0; i < qListLength; i++) {
    let bgImg = `../public/img/pageItem/q${i + 1}.svg`;
    incertCss += `.q-list:nth-of-type(${
      i + 1
    }):before {background: url('${bgImg}');background-size: contain;}`;
    console.log(
      `.q-list:nth-of-type(${
        i + 1
      }):before {background: url('${bgImg}');background-size: contain;}`
    );
  }
  return incertCss;
}

$('<style>' + handleQListIcon() + '</style>').appendTo('head');
