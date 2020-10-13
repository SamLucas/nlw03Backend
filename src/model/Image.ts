import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import orphanage from '../controller/orphanage';
import Orphanage from './Orphanage'

@Entity('images')
export default class Image {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	path: string;

	@ManyToOne(() => Orphanage, orphanage => orphanage.images)
	@JoinColumn({ name: 'orphanage_id' })
	orphanage: Orphanage;
}