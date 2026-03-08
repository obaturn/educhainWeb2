
import React from 'react';
import { CloseIcon } from './icons/IconComponents';

interface WalletConnectModalProps {
    onClose: () => void;
    onConnect: (isAdmin?: boolean) => void;
}

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({ onClose, onConnect }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity">
            <div className="bg-dark-card rounded-lg shadow-xl p-8 w-full max-w-sm border border-dark-border relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-dark-text-secondary hover:text-dark-text-primary">
                    <CloseIcon className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold text-center mb-6 text-dark-text-primary">Connect Wallet</h2>
                <div className="space-y-4">
                    <p className="text-center text-dark-text-secondary">
                        Connect your wallet to access the eDuChain platform. This is a simulation.
                    </p>
                    <button 
                        onClick={() => onConnect(false)} 
                        className="w-full flex items-center justify-center bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                    >
                        Connect as User
                    </button>
                    <button 
                        onClick={() => onConnect(true)}
                        className="w-full flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                    >
                        Connect as Admin
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WalletConnectModal;
