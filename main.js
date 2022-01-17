"use strict";

let resetSW = false;

$("#select").click(function() {
  $("#html").select();
});

$("#convert").click(function() {
  let checkSW = [false, false];
  let cb = document.op.checkBox;

  for (let i = 0; i < cb.length; i++) {
    if (cb[i].checked) {
      checkSW[i] = true;    
    }
  }

  let sourceText = document.getElementById("source").value;
  let result = "";

  // 改行処理
  if (checkSW[0] === true) {
    sourceText = sourceText.replace(/\n/g, "<br>\n");
  }

  if (checkSW[1] === true) {
    sourceText = sourceText.replace(/\n/g, "\\n");
  }

  // 傍点処理
  if (checkSW[2] === true) {
    let slicedWords = new Array();
    let i = 0;
    let startBranket = 0;
    let endBranket = 0;
    let emp = "";
    let temp = "";
    let deleter = "";
    startBranket = sourceText.indexOf("《《");
    endBranket = sourceText.indexOf("》》");
    
    console.log(startBranket);
    
    // 《《が冒頭に来る場合は「0」、存在しない場合は「-1」
    while (startBranket >= 0) {
      if (startBranket >= 0 && endBranket > startBranket) {
        result += sourceText.slice(0, startBranket);

        emp = sourceText.slice(startBranket + 2, endBranket);
        deleter = sourceText.slice(0, endBranket + 2);
        sourceText = sourceText.replace(deleter, "");

        for (let j = 0; j < emp.length; j++) {
          temp += "<ruby><rb>" + emp.slice(j, j + 1) + "</rb><rp>（</rp><rt>・</rt><rp>）</rp></ruby>";
        }  

        result += temp;
        temp = "";
        startBranket = sourceText.indexOf("《《");
        endBranket = sourceText.indexOf("》》");

      } else {
        if (endBranket < startBranket) {
          alert("何か……間違ってます。");
        }
        break;
      }
    }

    result += sourceText;
    
    console.log("result:" + result);
    console.log("emp:" + emp);
    console.log("deleter:" + deleter);
    console.log("temp:" + temp);
    console.log("sourceText:" + sourceText);
    console.log("startBranket:" + startBranket);
    console.log("endBranket:" + endBranket);
    // console.log(sourceText);
  } else {
    let result = sourceText;
  }

  // ルビ処理
  if (checkSW[3] === true) {
    result = result.replace(/｜/g, "<ruby><rb>");
    result = result.replace(/\|/g, "<ruby><rb>");
    result = result.replace(/《/g, "</rb><rp>（</rp><rt>");
    result = result.replace(/》/g, "</rt><rp>）</rp></ruby>");
  }

  $("#html").val(result);

});

$("#reset").click(function() {
  // 値を設定
  $("#source").val("｜堕天男《ルシファー》");
  $("#html").val("<RUBY><RB>堕天男</RB><RP>（</RP><RT>ルシファー</RT><RP>）</RP></RUBY><br>");
});

