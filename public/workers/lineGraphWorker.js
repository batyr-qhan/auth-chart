this.onmessage = e => {
  if (e.data) {
    for (let i = 0; i < e.data.list.length; i++) {
      for (let j = 0; j < e.data.list[i]; j++) {
        let item = e.data.list[i][j];
        const date = new Date(item[0])
        item[0] = date.getTime();
      }
    }

    let chart1 = {
      data: []
    }

    chart1.data = e.data.list[0].data;

    let chart2 = {
      data: []
    }
    chart2.data = e.data.list[1].data;

    let chart3 = {
      data: []
    }
    chart3.data = e.data.list[2].data;

    let result = {
      obj: chart1,
      obj2: chart2,
      obj3: chart3
    }

    this.postMessage(result)
  }
}