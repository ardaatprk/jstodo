(function () {
	'use strict';

	const STORAGE_KEY = 'todos';
	const todoListElement = document.getElementById('list');
	const taskInputElement = document.getElementById('task');

	function generateId() {
		return 'todo_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
	}

	function getStoredTodos() {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return null;
			const parsed = JSON.parse(raw);
			if (!Array.isArray(parsed)) return null;
			return parsed;
		} catch (_err) {
			return null;
		}
	}

	function saveTodos(todos) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}

	function readInitialTodosFromDom() {
		const items = Array.from(todoListElement.querySelectorAll('li'));
		return items.map(function (li) {
			return {
				id: generateId(),
				text: li.textContent.trim(),
				done: li.classList.contains('checked')
			};
		});
	}

	function clearListDom() {
		while (todoListElement.firstChild) {
			todoListElement.removeChild(todoListElement.firstChild);
		}
	}

	function createDeleteButton(id) {
		const closeSpan = document.createElement('span');
		closeSpan.className = 'close';
		closeSpan.textContent = '\u00D7';
		closeSpan.setAttribute('data-id', id);
		closeSpan.addEventListener('click', function (event) {
			event.stopPropagation();
			deleteElementById(id);
		});
		return closeSpan;
	}

	function renderTodos(todos) {
		clearListDom();
		todos.forEach(function (todo) {
			const li = document.createElement('li');
			li.textContent = todo.text;
			li.setAttribute('data-id', todo.id);
			if (todo.done) {
				li.classList.add('checked');
			}
			li.addEventListener('click', function () {
				toggleDoneById(todo.id);
			});
			li.appendChild(createDeleteButton(todo.id));
			todoListElement.appendChild(li);
		});
	}

	function showToastSuccess(message) {
		const body = document.querySelector('#toastSuccess .toast-body');
		if (body && typeof message === 'string' && message.trim().length > 0) {
			body.textContent = message;
		}
		if (window.jQuery && window.jQuery.fn && window.jQuery.fn.toast) {
			window.jQuery('#toastSuccess').toast('show');
		}
	}

	function showToastError(message) {
		const body = document.querySelector('#toastError .toast-body');
		if (body && typeof message === 'string' && message.trim().length > 0) {
			body.textContent = message;
		}
		if (window.jQuery && window.jQuery.fn && window.jQuery.fn.toast) {
			window.jQuery('#toastError').toast('show');
		}
	}

	function getTodosEnsured() {
		let todos = getStoredTodos();
		if (!todos) {
			const initial = readInitialTodosFromDom();
			todos = initial;
			saveTodos(todos);
		}
		return todos;
	}

	function syncAndRender(todos) {
		saveTodos(todos);
		renderTodos(todos);
	}

	function addElement(text) {
		const trimmed = (text || '').trim();
		if (trimmed.length === 0) {
			showToastError('Listeye boş ekleme yapamazsınız!');
			return false;
		}
		const todos = getTodosEnsured();
		const newTodo = { id: generateId(), text: trimmed, done: false };
		const updated = todos.concat([newTodo]);
		syncAndRender(updated);
		showToastSuccess('Listeye eklendi.');
		return true;
	}

	function deleteElementById(id) {
		const todos = getTodosEnsured();
		const updated = todos.filter(function (t) { return t.id !== id; });
		syncAndRender(updated);
	}

	function toggleDoneById(id) {
		const todos = getTodosEnsured();
		const updated = todos.map(function (t) {
			if (t.id === id) {
				return { id: t.id, text: t.text, done: !t.done };
			}
			return t;
		});
		syncAndRender(updated);
	}

	function newElement() {
		const value = taskInputElement ? taskInputElement.value : '';
		const ok = addElement(value);
		if (ok && taskInputElement) {
			taskInputElement.value = '';
			taskInputElement.focus();
		}
	}

	window.addElement = addElement;
	window.deleteElement = deleteElementById;
	window.toggleDone = toggleDoneById;
	window.newElement = newElement;

	(function init() {
		const todos = getTodosEnsured();
		renderTodos(todos);
		if (taskInputElement) {
			taskInputElement.addEventListener('keyup', function (event) {
				if (event.key === 'Enter') {
					newElement();
				}
			});
		}
	})();
})();


