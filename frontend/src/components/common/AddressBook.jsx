import React from 'react';
import { MapPin, Plus, CheckCircle, MoreVertical, Trash2, Edit } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const AddressBook = ({ addresses, selectedAddressId, onSelect, onAdd, onEdit, onDelete, onSetDefault }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-200/60 animate-fade-in">
        <div>
          <h2 className="text-sm font-sans font-bold text-neutral-800 uppercase tracking-wider">Delivery Address</h2>
          <p className="text-[10px] text-neutral-400 mt-1.5 uppercase tracking-wider font-bold font-sans">Select or add a new destination</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#800000] hover:text-[#5C1A1B] transition-all duration-300 group cursor-pointer font-sans"
        >
          <div className="p-1.5 rounded-xl border border-[#800000]/15 group-hover:border-[#800000]/40 group-hover:bg-[#800000]/5 transition-colors">
            <Plus className="w-3.5 h-3.5 text-[#800000]" />
          </div>
          <span>Add New</span>
        </button>
      </div>

      {(!addresses || addresses.length === 0) ? (
        <div className="bg-white rounded-3xl border border-neutral-200/60 p-12 text-center flex flex-col items-center shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="w-14 h-14 bg-[#FCFAF8] rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-neutral-100">
            <MapPin className="w-5 h-5 text-neutral-400" />
          </div>
          <h3 className="text-base font-serif font-bold text-neutral-800 mb-1.5">No Saved Addresses</h3>
          <p className="text-neutral-500 mb-6 text-xs font-sans font-medium">You haven't saved any delivery destinations yet.</p>
          <button
            onClick={onAdd}
            className="bg-gradient-to-r from-[#5C1A1B] to-[#800000] text-white text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 hover:shadow-lg transition-all rounded-xl border border-[#B8934E]/25 cursor-pointer font-sans"
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
                className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'border-[#B8934E] bg-[#FAF9F6] ring-1 ring-[#B8934E]/20 shadow-[0_10px_25px_-10px_rgba(184,147,78,0.15)] scale-[1.005]'
                    : 'border-neutral-200 bg-white hover:border-[#B8934E]/30 hover:bg-[#FCFAF8]'
                }`}
                onClick={() => onSelect(address)}
              >
                {/* Checkmark for selection */}
                {isSelected && (
                  <div className="absolute top-4 right-4 flex items-center justify-center animate-fade-in">
                    <CheckCircle className="w-5 h-5 text-[#B8934E]" strokeWidth={1.5} />
                  </div>
                )}

                <div className="pr-10 font-sans">
                  <div className="flex items-center space-x-2.5 mb-3">
                    <h3 className="font-sans font-bold text-neutral-800 text-sm leading-tight uppercase tracking-wider">{address.fullName}</h3>
                    {address.title && (
                      <span className="bg-white border border-[#B8934E]/30 text-[#B8934E] text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md">
                        {address.title}
                      </span>
                    )}
                    {address.isDefault && (
                      <span className="bg-[#800000] text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                        Default
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-neutral-500 mb-4 leading-relaxed font-semibold">
                    {address.address}, {address.city}
                    {address.state && `, ${address.state}`} <br />
                    {address.country} - {address.zipCode}
                  </p>
                  
                  <div className="text-xs text-neutral-800 flex flex-col space-y-1.5 border-t border-neutral-100 pt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider w-20 shrink-0">Phone:</span>
                      <span className="font-bold text-neutral-800 text-xs">{address.phoneNo}</span>
                    </div>
                    {address.altPhoneNo && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider w-20 shrink-0">Alt Phone:</span>
                        <span className="font-bold text-neutral-850 text-xs">{address.altPhoneNo}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dropdown Menu for Actions */}
                <div className="absolute bottom-3 right-3" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 text-neutral-400 hover:text-[#B8934E] rounded-full hover:bg-neutral-50 transition-colors cursor-pointer">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white border border-neutral-100 shadow-xl rounded-2xl py-1 z-30 font-sans">
                      <DropdownMenuItem 
                        onClick={() => onEdit(address)}
                        className="cursor-pointer py-2.5 px-4 text-[10px] font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-50 focus:bg-neutral-50 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5 mr-2.5 text-neutral-400" />
                        Edit Address
                      </DropdownMenuItem>
                      {!address.isDefault && (
                        <DropdownMenuItem 
                          onClick={() => onSetDefault(address._id)}
                          className="cursor-pointer py-2.5 px-4 text-[10px] font-bold uppercase tracking-wider text-neutral-700 hover:bg-neutral-50 focus:bg-neutral-50 transition-colors"
                        >
                          <CheckCircle className="w-3.5 h-3.5 mr-2.5 text-[#B8934E]" />
                          Set as Default
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => onDelete(address._id)}
                        className="cursor-pointer py-2.5 px-4 text-[10px] font-bold uppercase tracking-wider text-red-650 hover:bg-red-50 focus:bg-red-50 focus:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-2.5 text-red-400" />
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
