// Key Data Management System
// Sistem untuk generate dan validasi key data review

// Generate random key (format: XXXX-XXXX-XXXX)
export const generateKey = () => {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const segments = 3;
	const segmentLength = 4;
	
	let key = '';
	for (let i = 0; i < segments; i++) {
		if (i > 0) key += '-';
		for (let j = 0; j < segmentLength; j++) {
			key += chars.charAt(Math.floor(Math.random() * chars.length));
		}
	}
	
	return key;
};

// Get all keys from localStorage
export const getAllKeys = () => {
	const keys = localStorage.getItem('review_keys');
	return keys ? JSON.parse(keys) : [];
};

// Save keys to localStorage
const saveKeys = (keys) => {
	localStorage.setItem('review_keys', JSON.stringify(keys));
};

// Initialize default keys (10 keys) - HANYA jika localStorage kosong
export const initializeKeys = () => {
	const existingKeys = getAllKeys();
	if (existingKeys.length === 0) {
		const newKeys = [];
		for (let i = 0; i < 10; i++) {
			newKeys.push({
				key: generateKey(),
				used: false,
				usedBy: null,
				usedAt: null,
				productId: null,
				createdAt: new Date().toISOString(),
				protected: false // TAMBAHAN: Flag untuk proteksi
			});
		}
		saveKeys(newKeys);
		return newKeys;
	}
	return existingKeys;
};

// Add new keys
export const addKeys = (count = 1) => {
	const keys = getAllKeys();
	const newKeys = [];
	
	for (let i = 0; i < count; i++) {
		newKeys.push({
			key: generateKey(),
			used: false,
			usedBy: null,
			usedAt: null,
			productId: null,
			createdAt: new Date().toISOString(),
			protected: false // TAMBAHAN: Flag untuk proteksi
		});
	}
	
	saveKeys([...keys, ...newKeys]);
	return newKeys;
};

// Validate key (check if exists and not used)
export const validateKey = (keyToValidate) => {
	const keys = getAllKeys();
	const keyData = keys.find(k => k.key === keyToValidate.toUpperCase());
	
	if (!keyData) {
		return { valid: false, message: 'Invalid key' };
	}
	
	if (keyData.used) {
		return { valid: false, message: 'This key has already been used' };
	}
	
	return { valid: true, message: 'Valid key' };
};

// Mark key as used - TAMBAHAN: Set protected = true
export const useKey = (keyToUse, userName, productId) => {
	const keys = getAllKeys();
	const keyIndex = keys.findIndex(k => k.key === keyToUse.toUpperCase());
	
	if (keyIndex === -1) {
		return false;
	}
	
	keys[keyIndex].used = true;
	keys[keyIndex].usedBy = userName;
	keys[keyIndex].usedAt = new Date().toISOString();
	keys[keyIndex].productId = productId;
	keys[keyIndex].protected = true; // PERBAIKAN: Protect key yang sudah dipakai
	
	saveKeys(keys);
	return true;
};

// Get available keys count
export const getAvailableKeysCount = () => {
	const keys = getAllKeys();
	return keys.filter(k => !k.used).length;
};

// Get used keys count
export const getUsedKeysCount = () => {
	const keys = getAllKeys();
	return keys.filter(k => k.used).length;
};

// PERBAIKAN: Delete all keys - HANYA hapus yang belum dipakai (not protected)
export const deleteAllKeys = () => {
	const keys = getAllKeys();
	// Filter: hanya simpan keys yang sudah used (protected)
	const protectedKeys = keys.filter(k => k.protected === true);
	saveKeys(protectedKeys);
	return {
		deleted: keys.length - protectedKeys.length,
		protected: protectedKeys.length
	};
};

// PERBAIKAN: Delete specific key - tidak bisa hapus jika protected
export const deleteKey = (keyToDelete) => {
	const keys = getAllKeys();
	const keyData = keys.find(k => k.key === keyToDelete);
	
	// Cek apakah key protected
	if (keyData && keyData.protected) {
		return {
			success: false,
			message: 'Cannot delete used key. This key is protected because it has been used for a review.'
		};
	}
	
	const filteredKeys = keys.filter(k => k.key !== keyToDelete);
	saveKeys(filteredKeys);
	return {
		success: true,
		message: 'Key deleted successfully'
	};
};

// Get key statistics
export const getKeyStatistics = () => {
	const keys = getAllKeys();
	const protectedCount = keys.filter(k => k.protected === true).length;
	
	return {
		total: keys.length,
		available: keys.filter(k => !k.used).length,
		used: keys.filter(k => k.used).length,
		protected: protectedCount, // TAMBAHAN: Jumlah key yang dilindungi
		usageRate: keys.length > 0 ? ((keys.filter(k => k.used).length / keys.length) * 100).toFixed(1) : 0
	};
};

// TAMBAHAN: Function untuk mendapatkan jumlah protected keys
export const getProtectedKeysCount = () => {
	const keys = getAllKeys();
	return keys.filter(k => k.protected === true).length;
};