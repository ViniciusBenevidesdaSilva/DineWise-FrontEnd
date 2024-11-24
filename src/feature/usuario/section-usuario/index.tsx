'use client';

import { useEffect, useState } from 'react';

import { Usuario } from '@/entities/usuario';
import { SearchInput } from '@/widgets/inputs/search-input';

import { TableUsuario } from '../table-usuario';

type TSectionUsuarioProps = {
  usuarios: Usuario[];
};

export function SectionUsuario({ usuarios }: Readonly<TSectionUsuarioProps>) {
  const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>(usuarios);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  useEffect(() => {
    if (searchTerm) {
      const filtered = usuarios.filter(
        (usuario) =>
          usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsuarios(filtered);
    } else {
      setFilteredUsuarios(usuarios);
    }
  }, [usuarios, searchTerm]);

  return (
    <section className='w-full max-h-screen'>
      <SearchInput inputName='usuario' onChange={setSearchTerm} />
      <div className='relative overflow-x-auto max-h-[50vh] lg:max-h-[75vh] overflow-y-auto shadow-md rounded-lg'>
        <TableUsuario usuarios={filteredUsuarios} />
      </div>
    </section>
  );
}
