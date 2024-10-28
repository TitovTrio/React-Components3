import { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
	const [buttons] = useState(['-', '+', '=', 'C', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
	const [buffer, setBuffer] = useState([]);
	const [numb, setNumb] = useState('0');
	const [operator, setOperator] = useState(' ');

	const enterNumber = (e) => {
		if (operator === 'C') {
			setOperator(' ');
		}
		if (numb === '0') {
			setNumb(e.target.textContent);
		} else {
			setNumb(numb + String(e.target.textContent));
		}
	};

	const calculate = (e) => {
		if (e.target.textContent === '+') {
			setBuffer((buffer) => [...buffer, operator, Number(numb)]);
			setNumb('0');
			setOperator('+');
		}
		if (e.target.textContent === '-') {
			setBuffer((buffer) => [...buffer, operator, Number(numb)]);
			setNumb('0');
			setOperator('-');
		}
		if (e.target.textContent === '=') {
			const updatedBuffer = [...buffer, operator, Number(numb)];
			const result = updatedBuffer.reduce((acc, value, index, array) => {
				if (isNaN(value) || value === ' ') {
					const nextValue = array[index + 1];
					if (value === '-') {
						return acc - nextValue;
					} else {
						return acc + nextValue;
					}
				} else {
					return acc;
				}
			}, 0);
			setOperator('=');
			setNumb(result);
			setBuffer([]);
		}
		if (e.target.textContent === 'C') {
			setBuffer([]);
			setNumb('0');
			setOperator('C');
		}
	};

	return (
		<div className={styles.container}>
			Calc 9000
			<div className={styles.screen}>
				<div className={styles.buffer}>{buffer.at(-1)}</div>
				<div className={styles.operator}>{operator}</div>
				<div className={operator === '=' ? styles.numbGreen : ''}>{numb}</div>
			</div>
			<div className={styles.funcBlock}>
				{buttons.map((value, index) => {
					if (index < 4) {
						return (
							<button
								className={styles.button + ' ' + styles.funcButton}
								key={index}
								onClick={calculate}
							>
								{value}
							</button>
						);
					}
				})}
			</div>
			<div className={styles.numsBlock}>
				{buttons.map((value, index) => {
					if (index > 3) {
						return (
							<button
								className={styles.button + ' ' + styles.numsButton}
								key={index}
								onClick={enterNumber}
							>
								{value}
							</button>
						);
					}
				})}
			</div>
		</div>
	);
};
