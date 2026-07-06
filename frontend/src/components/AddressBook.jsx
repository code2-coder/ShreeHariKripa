import React from 'react';
import { MapPin, Plus, CheckCircle, MoreVertical, Trash2, Edit } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const AddressBook = ({ addresses, selectedAddressId, onSelect, onAdd, onEdit, onDelete, onSetDefault }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Delivery Address</h2>
          <p className="text-sm text-gray-500 mt-1">Select or add a new destination</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 text-sm font-medium text-gray-900 hover:text-black transition-colors group"
        >
          <div className="p-1.5 rounded-full border border-gray-200 group-hover:border-gray-400 transition-colors">
            <Plus className="w-4 h-4" />
          </div>
          <span>Add New</span>
        </button>
      </div>

      {(!addresses || addresses.length === 0) ? (
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100">
            <MapPin className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Saved Addresses</h3>
          <p className="text-gray-500 mb-6 text-sm">You haven't saved any delivery destinations yet.</p>
          <button
            onClick={onAdd}
            className="bg-gray-900 text-white font-medium px-6 py-3 hover:bg-black transition-colors rounded-xl"
          >
            Add New Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => {
            const isSelected = selectedAddressId === address._id;
            return (
              <div
                key={address._id}
                className={`relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'border-gray-900 bg-gray-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => onSelect(address)}
              >
                {/* Checkmark for selection */}
                {isSelected && (
                  <div className="absolute top-4 right-4 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-gray-900" />
                  </div>
                )}

                <div className="pr-10">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-base">{address.fullName}</h3>
                    {address.title && (
                      <span className="bg-white border border-gray-200 text-gray-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                        {address.title}
                      </span>
                    )}
                    {address.isDefault && (
                      <span className="bg-gray-900 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {address.address}, {address.city}
                    {address.state && `, ${address.state}`} <br />
                    {address.country} - {address.zipCode}
                  </p>
                  
                  <div className="text-sm text-gray-900 flex flex-col space-y-1">
                    <div className="flex items-center">
                      <span className="text-gray-500 w-12 text-xs">Phone:</span>
                      <span className="font-medium">{address.phoneNo}</span>
                    </div>
                    {address.altPhoneNo && (
                      <div className="flex items-center">
                        <span className="text-gray-500 w-12 text-xs">Alt:</span>
                        <span className="font-medium">{address.altPhoneNo}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dropdown Menu for Actions */}
                <div className="absolute bottom-3 right-3" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-200 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-100 shadow-lg rounded-xl py-1">
                      <DropdownMenuItem 
                        onClick={() => onEdit(address)}
                        className="cursor-pointer py-2.5 px-4 text-sm font-medium text-gray-700 focus:bg-gray-50 transition-colors"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Address
                      </DropdownMenuItem>
                      {!address.isDefault && (
                        <DropdownMenuItem 
                          onClick={() => onSetDefault(address._id)}
                          className="cursor-pointer py-2.5 px-4 text-sm font-medium text-gray-700 focus:bg-gray-50 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Set as Default
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => onDelete(address._id)}
                        className="cursor-pointer py-2.5 px-4 text-sm font-medium text-red-600 focus:bg-red-50 focus:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Address
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
