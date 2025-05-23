"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import stationService from "@/lib/services/station";
import { IStation } from "@/lib/interfaces/Station";
import { useState } from "react";
import Spinner from "../icons/spinner";

const formSchema = z
  .object({
    computer: z
      .string()
      .min(6, {
        message: "Computer must be at least 6 characters.",
      })
      .max(6, {
        message: "Computer must be at most 6 characters.",
      })
      .regex(/^\d+$/, {
        message: "Deve conter apenas números.",
      }),
    processor: z.string().min(2, {
      message: "Processor must be at least 2 characters.",
    }),
    monitor1: z
      .string()
      .min(6, {
        message: "Monitor 1 precisa de 6 caracteres.",
      })
      .max(6, {
        message: "Monitor 1 precisa de 6 caracteres.",
      })
      .regex(/^\d+$/, {
        message: "Deve conter apenas números.",
      }),
    pol1: z
      .string()
      .min(2, {
        message: "Polegadas do monitor 1 precisa de 2 caracteres.",
      })
      .max(2, {
        message: "Polegadas do monitor 1 precisa de 2 caracteres.",
      })
      .regex(/^\d+$/, {
        message: "Deve conter apenas números.",
      }),
    monitor2: z.string(),
    pol2: z.string(),
    responsible: z
      .string()
      .min(3, {
        message: "Nome invalido.",
      })
      .max(20, {
        message: "Nome Invalido.",
      }),
  })
  .refine(
    (data) => {
      // Se monitor2 foi preenchido, pol2 também deve ser preenchido
      if (data.monitor2 && !data.pol2) {
        return false;
      }
      return true;
    },
    {
      message: "Preencha as polegadas do monitor 2.",
      path: ["pol2"],
    }
  )
  .refine(
    (data) => {
      if (data.monitor2 && !(data.monitor2.length === 6)) {
        return false;
      }
      return true;
    },
    {
      message: "Monitor 2 precisa de 6 caracteres.",
      path: ["monitor2"],
    }
  )
  .refine(
    (data) => {
      if (data.pol2 && !(data.pol2.length === 2)) {
        return false;
      }
      return true;
    },
    {
      message: "Polegadas do Monitor 2 precisa de 2 caracteres.",
      path: ["pol2"],
    }
  )
  .refine(
    (data) => {
      if (data.pol2 && !/^\d+$/.test(data.pol2)) {
        return false;
      }
      return true;
    },
    {
      message: "Deve conter apenas números.",
      path: ["pol2"],
    }
  )
  .refine(
    (data) => {
      if (data.monitor2 && !/^\d+$/.test(data.monitor2)) {
        return false;
      }
      return true;
    },
    {
      message: "Deve conter apenas números.",
      path: ["monitor2"],
    }
  );

export function ProfileForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      computer: "",
      processor: "",
      monitor1: "",
      pol1: "",
      monitor2: "",
      pol2: "",
      responsible: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const data: IStation = { ...values, userCreated: "admin" };
    try {
      const res = await stationService.create(data);
      if (res.status === 201) {
        form.reset();
        toast({
          title: "Concluido!",
          description: "Dados salvos com sucesso!",
          variant: "default",
          duration: 3000,
        });
        setLoading(false);
        return;
      }
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description:
          error instanceof Error
            ? error.message
            : "Ocorreu um erro ao salvar os dados.",
        variant: "destructive",
        duration: 3000,
      });
    }

    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full max-w-[600px] flex flex-col "
      >
        <FormField
          control={form.control}
          name="computer"
          render={({ field }) => (
            <FormItem className="h-20">
              <FormControl>
                <Input
                  placeholder="Computador"
                  {...field}
                  disabled={loading}
                  
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="processor"
          render={({ field }) => (
            <FormItem className="h-20">
              <FormControl>
                <Input
                  placeholder="Processador"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monitor1"
          render={({ field }) => (
            <FormItem className="h-20">
              <FormControl>
                <Input placeholder="Monitor 1" {...field} disabled={loading} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pol1"
          render={({ field }) => (
            <FormItem className="h-20">
              <FormControl>
                <Input
                  placeholder="Polegadas - monitor 1"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monitor2"
          render={({ field }) => (
            <FormItem className="h-20">
              <FormControl>
                <Input placeholder="Monitor 2" {...field} disabled={loading} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pol2"
          render={({ field }) => (
            <FormItem className="h-20">
              <FormControl>
                <Input
                  placeholder="Polegadas - monitor 2"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsible"
          render={({ field }) => (
            <FormItem className="h-20">
              <FormControl>
                <Input
                  placeholder="Responsavel"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full py-6 text-xl font-[600]"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner />
              Cadastrando...
            </span>
          ) : (
            "Cadastrar"
          )}
        </Button>
      </form>
    </Form>
  );
}
