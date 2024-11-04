"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { post } from '@/app/actions/postAction';

export const formSchema = z.object({
    category: z
        .string(),
    username: z
        .string()
        .min(2, { message: "ユーザー名は2文字以上で入力してください．" }),
    title: z
        .string()
        .min(2, { message: "タイトルは2文字以上で入力してください．" }),
    information: z
        .string().optional(),
    photoUrl: z
        .string().optional(),
    content: z
        .string().optional()
  });

const CreatePost = () => {
    const [category, setCategory] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const getTitle = () => {
        switch (category) {
            case "food":
                return {
                    title: "Restaurant name",
                    title_placeholder: "横浜家系ラーメン英吉",
                    location: "Location",
                    location_placeholder: "愛知県名古屋市天白区塩釜口2-801",
                    description: "Description",
                };
            case "place":
                return {
                    title: "Place name",
                    title_placeholder: "アベクリーニング",
                    location_placeholder: "愛知県豊田市寿町8-32-8",
                    location: "Location",
                    description: "Description",
                };
            case "movie":
                return {
                    title: "Movie title",
                    title_placeholder: "Stand by me",
                    description: "Description",
                };
            case "music":
                return {
                    title: "Song name",
                    title_placeholder: "On our way by The Royal Concept",
                    description: "Description",
                };
            case "book":
                return {
                    title: "Book title",
                    title_placeholder: "ネットワークの基本",
                    description: "Description",
                };
            default:
                return {
                    title: "",
                    title_placeholder: "",
                    location: "",
                    description: "",
                };
        }
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            category: "",
            username: "",
            title: "",
            information: "",
            photoUrl: "",
            content: "",
        }
    })

    async function getMusicData(title: string) {
        const response = await fetch (`http://localhost:3000/api/music/${title}`,{
            cache: "no-store",
        })
    
        const musicData = await response.json();
    
        return musicData;
    }

    async function getMovieData(title: string) {
        const response = await fetch (`http://localhost:3000/api/movie/${title}`,{
            cache: "no-store",
        })
    
        const movieData = await response.json();
    
        return movieData;
    }

    async function onSubmit(value: z.infer<typeof formSchema>) {
        let {category, username, title, information, photoUrl, content} = value;
        if (category === "music") {
            const musicData = await getMusicData(title);
            title = musicData.name;
            information = musicData.artists[0].name;
            photoUrl = musicData.album.images[0].url;
        }else if (category === "movie"){
            const movieData = await getMovieData(title);
            title = movieData.title;
            information = movieData.release_date;
            photoUrl = `https://image.tmdb.org/t/p/w200${movieData.poster_path}`;
        }
        
        post({category, username, title, information, photoUrl, content});
    }

    return (
        <div className="px-4 py-4 gap-4 font-[family-name:var(--font-geist-sans)">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={(value) => {
                                        field.onChange(value);
                                        setCategory(value);
                                    }} 
                                    defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="food">food</SelectItem>
                                            <SelectItem value="place">place</SelectItem>
                                            <SelectItem value="movie">movie</SelectItem>
                                            <SelectItem value="music">music</SelectItem>
                                            <SelectItem value="book">book</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Tatsuya Abe" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>{getTitle().title}</FormLabel>
                            <FormControl>
                                <Input placeholder={getTitle().title_placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    {(category === "food" || category === "place") && (
                        <FormField
                            control={form.control}
                            name="information"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{getTitle().location}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={getTitle().location_placeholder} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>{getTitle().description}</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="Write discription here"
                                className="resize-none"
                                {...field}
                                />
                            </FormControl>

                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    {(category === "food" || category === "place") && (
                        <FormField
                            control={form.control}
                            name="photoUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Upload Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            // onChange={(e) => {
                                            //     if (e.target.files) {
                                            //         setImageFile(e.target.files[0]); // 最初のファイルをセット
                                            //     }
                                            // }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default CreatePost
