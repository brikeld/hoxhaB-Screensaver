export function textTransition(div, endText) {
    let afInstance;
    let currText = [];
    let frame = 0;
    let indexes = [];
    let totalFrames = 0;
    let startText = div.textContent;

    currText = Array.from(startText);

    const maxText = Math.max(startText.length, endText.length);
    for (let i = 0; i < maxText; i++) {
        indexes.push(i);
    }

    totalFrames = startText.length;
    nextFrame();

    function nextFrame(t) {
        afInstance = requestAnimationFrame(nextFrame);
        if (frame >= totalFrames - 1) {
            stop();
        }
        update(t)
        frame++;
    }

    function stop() {
        cancelAnimationFrame(afInstance);
    }

    function update(time = 1) {
        let index = indexes[frame];

        currText[index] = endText[index] || ' ';
        div.textContent = currText.join('');
    }

    // Animation Patterns

    function randomizeIndexes(array) {
       // shuffleArray(array);
    }

    function sequentialIndexes(array) {
       //sequentialIndexes(indexes)
    }

    function wavePatternIndexes(array) {
       //wavePatternIndexes(indexes);
    }

    function centerOutwardIndexes(array, length) {
       // centerOutwardIndexes(indexes, maxText);
    }
}

//

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function sequentialIndexes(array) {
    for (let i = 0; i < array.length; i++) {
        array[i] = i;
    }
}

function wavePatternIndexes(array) {
    let mid = Math.floor(lenght/ 2);
    let left = mid -1;
    let right = mid + 1;
    array[mid] = mid;
}

function centerOutwardIndexes(array, length) {
    let mid = Math.floor(length / 2);
    let left = mid - 1;
    let right = mid + 1;
    array[mid] = mid;
 
    while (left >= 0 || right < length) {
        if (left >= 0) array[left] = left;
        if (right < length) array[right] = right;
        left--;
        right++;
    }
}

function randomizeIndexes(array) {
    shuffleArray(array);
}