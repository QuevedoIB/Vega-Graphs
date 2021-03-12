export const generateRandomColor = () => `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;

export const random_rgba = () => {
    const randomNumber = () => Math.round(Math.random() * 255)
    return `rgba(${randomNumber()},${randomNumber()},${randomNumber}, ${Math.random().toFixed(1)})`
}