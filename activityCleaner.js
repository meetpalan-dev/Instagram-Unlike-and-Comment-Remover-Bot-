/**
 * Instagram Activity Cleaner
 * Author: meetpalan-dev
 * Runs in browser console
 * For educational & personal use only
 */


(async () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const names = new Set();

    const cards = document.querySelectorAll(
        'button, a, div[role="button"]'
    );

    console.log("Cards found:", cards.length);

    for (let i = 0; i < cards.length; i++) {
        cards[i].scrollIntoView({ behavior: "smooth", block: "center" });
        cards[i].click();

        await sleep(300);

        const title = document.querySelector(
            'h3.MuiTypography-bodyStaticLg'
        );

        if (title) {
            const name = title.textContent.trim();
            if (name.match(/\.(jpg|jpeg|png)$/i)) {
                names.add(name);
                console.log(`✔ ${i + 1}: ${name}`);
            }
        }
    }

    console.log("Approved total:", names.size);

    const csv = "filename\n" + [...names].join("\n");
    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "approved_files.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
})();
