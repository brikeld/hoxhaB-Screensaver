export function map(num, start1, stop1, start2, stop2) {
    return ((num - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}

export function setVariable(domElement, obj) {
    const value = Object.keys(obj)
        .map(function (key) {
            return `"${key}" ${obj[key]}`;
        })
        .join(', ');

    domElement.style.setProperty('font-variation-settings', value);
}

export function useMouse() {
    const mouse = { x: 0, y: 0 };
    document.addEventListener("mousemove", (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });
    return mouse;
}