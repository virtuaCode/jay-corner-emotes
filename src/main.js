// "https://twitchemotes.com/api/stats/total/graph?id=emotesv2_0e21ec1036a74459bde59b65f5e08d42,300050464,emotesv2_05e2c02b464949a08e61385bae3c6ae9,305927340,emotesv2_a31a1165620c42cda2a7cc554cdbaa98,emotesv2_f078bdd3e0c440efb7db748c11cb3ba1,emotesv2_357ba898c61449cc8321071446ff2def,300785448,emotesv2_1949c68462dc4d3fa80ce1d7edc92fea,305927251,1677414,305832075,307982228,emotesv2_a48fbbe34dc14a25a974ce88b4283165,emotesv2_8638cde57c944c47849e0016d37e89f0,emotesv2_90d3187954aa4b3ea46815f6bbf1bd88,emotesv2_ece049c429814042a64dd6ab72f3d859,emotesv2_37f13cf25dcf4ac7a9a779fe0316ff39,emotesv2_cc17754baff249acacccac758d838a93,emotesv2_85fe8b785ef84cea8dba36ccceaebef7,emotesv2_8e9bf69d6d01473c95fda5fd36d883b3,307982010,emotesv2_68e6862e3b584f31967dd57272bef881,emotesv2_6a4c458ba119438b9e4590c930fc1c9c,305927254,305993380,300208092,emotesv2_be703ca47da145579493116f566d07a4,305929126,304817075,emotesv2_735592636a544c91b52fbb61e20ff79c,emotesv2_8ac0a10552cc444aa6f43ac78d56407e,emotesv2_395cae672a4a4645bfda44b379d560ed,emotesv2_38580ecb93f6411083b565ee9cfeba0d,emotesv2_5a431d1308fd418b9878f187c2e77996,emotesv2_8b846e3468c041b3945e73ca98ba8c65,emotesv2_e37bbf57f3ec43a8921c9421b0c2ae11,304817071,emotesv2_cf946e613588402c86f6cdcc9a9a8d51,307981936,305927345,307982066,300636081,emotesv2_4fb8ba2481554ec981b63cb465217036"

let maximum = 0;

function addEmoteElement(code, id, sum) {
    let temp = document.getElementsByTagName("template")[0];
    let clone = temp.content.cloneNode(true);
    let list = document.body.querySelector(".grid")
    let img = clone.querySelector("img");
    let codeElem = clone.querySelector(".code");
    let countElem = clone.querySelector(".sum");
    let progressElem = clone.querySelector(".progress");

    img.src = "https://static-cdn.jtvnw.net/emoticons/v2/" + id + "/default/light/2.0"
    codeElem.innerText = code;
    countElem.innerText = "" + sum;
    progressElem.style.width =  (sum / maximum) * 100 + "%";

    list.appendChild(clone);
}

function setHeader(min, max) {
    let header = document.body.querySelector("header");
    header.innerHTML = "<h1>Jay_Corner Emotes Stats</h1> Zwischen " + (new Date(min)).toDateString() + " und " + (new Date(max)).toDateString() ;
}

function showStats(data) {
    let minTime = -1;
    let maxTime = -1;

    const items = [];

    for (let emote of data) {
        let sum = 0;
        for (let item of emote.data) {
            let [time, count] = item;

            if (time > maxTime || maxTime == -1) {
                maxTime = time;
            }

            if (time < minTime || minTime == -1) {
                minTime = time;
            }

            sum += count;
        }

        items.push({code: emote.code, id: emote.id, sum: sum});
    }

    items.sort((a, b) => b.sum - a.sum)

    maximum = items[0].sum;

    for (let item of items) {
        addEmoteElement(item.code, item.id, item.sum);
    }

    setHeader(minTime, maxTime);
}

fetch("graph.json")
.then(res => res.json())
.then(showStats)
.catch(err => console.error(err))
